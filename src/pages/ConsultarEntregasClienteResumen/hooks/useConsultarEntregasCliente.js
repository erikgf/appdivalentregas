import { useState } from "react";
import { getEntregasCliente } from "../../../services/entregas/getEntregasCliente";
import { useEstados } from "../../../hooks/useEstados";

export const useConsultarEntregasCliente = () =>{
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(null);
    const { getNombreEstado } = useEstados();

    const onListar = async ({idZona, idLocal, idEstado, fechaInicio, fechaFin}) => {
        setCargando(true);   
        try{
            const data = await getEntregasCliente({idCliente: 1, idZona, idLocal, idEstado, fechaInicio, fechaFin});
            setData(data.map( e => {
                return {
                    ...e,
                    estado: getNombreEstado(e.id_estado)
                }
            }));
        } catch (e) {
            setError(e);
        } finally {
            setCargando(false);
        }
    };
    
    return {
        data,
        cargando, 
        error,
        onListar
    };

};