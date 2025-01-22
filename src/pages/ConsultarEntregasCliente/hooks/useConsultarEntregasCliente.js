import { useState } from "react";
import { getEntregasCliente } from "../../../services/entregas/getEntregasCliente";

const idCliente = 1;

export const useConsultarEntregasCliente = ({setModoExterno}) =>{
    const [data, setData] = useState([]);
    const [zonas, setZonas] = useState([]);
    const [locales, setLocales] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(null);
    const [registro, setRegistro] = useState(null);
    const [flagModal, setFlagModal] = useState(false);

    const onListar = async ({fechaInicio, fechaFin, idEstado}, cambiarModoExterno) => {
        setCargando(true);   
        try{

            const data = await getEntregasCliente({idCliente: idCliente, idEstado, fechaInicio, fechaFin});
            let zonas = [];
            let locales = [];

            const dataProcesada = data.map(item => {
                const valores_formato = Boolean(item?.valores_formato) ? JSON.parse(item?.valores_formato) : null;
                const estructura = Boolean(item?.estructura) ? JSON.parse(item.estructura) : null;

                const valores =  Boolean(valores_formato && estructura)
                    ? estructura?.map( _item => {
                        return {
                            key: _item.key,
                            label: _item.name,
                            value: Boolean(valores_formato) ? valores_formato[_item.key] : null
                        }
                    })
                    : [];

                if (!(zonas.find( _item => _item.id === item.id_zona))){
                    zonas.push(item.zona);
                }

                if (!(locales.find( _item => _item.id === item.id_local))){
                    locales.push({...item.local, id_zona: item.id_zona});
                }

                return {
                    ...item,
                    valores
                };
            });

            if (cambiarModoExterno){
                setModoExterno(false);
            }
            setData(dataProcesada);
            setZonas(zonas);
            setLocales(locales);
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
        registro,
        zonas,
        locales
    };

};