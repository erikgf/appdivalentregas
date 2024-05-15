import { useState } from "react";
import { getEntregasCliente } from "../../../services/entregas/getEntregasCliente";

const idCliente = 1;

export const useConsultarEntregasCliente = () =>{
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(null);
    const [registro, setRegistro] = useState(null);
    const [flagModal, setFlagModal] = useState(false);

    const onListar = async ({idZona, idLocal, idEstado, fechaInicio, fechaFin}) => {
        setCargando(true);   
        try{
            const data = await getEntregasCliente({idCliente: idCliente, idZona, idLocal, idEstado, fechaInicio, fechaFin});
            setData(data);
        } catch (e) {
            setError(e);
        } finally {
            setCargando(false);
        }
    };

    const onSeleccionar = ({id}) => {
        const registroSeleccionado =  data.find( item =>  item.id === id);
        setRegistro( {
            ...registroSeleccionado,
            images : JSON.parse(registroSeleccionado.cadena_fotos)
        });
        setFlagModal( true );
    };
    
    return {
        data,
        cargando, 
        error,
        onListar,
        onSeleccionar,
        setFlagModal,
        flagModal,
        registro
    };

};