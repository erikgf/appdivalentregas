import { useState } from "react";
import { getEntregasCliente } from "../../../services/entregas/getEntregasCliente";
import { useEstados } from "../../../hooks/useEstados";

export const useConsultarEntregasClienteResumen = () =>{
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(null);
    const { getNombreEstado } = useEstados();
    const [zonas, setZonas] = useState([]);
    const [locales, setLocales] = useState([]);

    const onListar = async ({idEstado, fechaInicio, fechaFin}) => {
        setCargando(true);   
        try{
            const data = await getEntregasCliente({idEstado, fechaInicio, fechaFin});
            setData(data.map( item => {
                if (!(zonas.find( _item => _item.id === item.id_zona))){
                    zonas.push(item.zona);
                }
    
                if (!(locales.find( _item => _item.id === item.id_local))){
                    locales.push({...item.local, id_zona: item.id_zona});
                }

                return {
                    ...item,
                    estado: getNombreEstado(item.id_estado)
                }
            }));
            
            setZonas(zonas);
            setLocales(locales);

            console.log({zonas, locales});
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
        zonas,
        locales,
        onListar
    };

};