import { useEffect, useState } from "react";
import { getZonasRepartidor } from "../services/zonas";

export const useZonaRepartidoresBean = () =>{
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(null);
    
    const onListar = async () => {
        setCargando(true);   
        try{
            const data = await getZonasRepartidor();
            setData(data);
        } catch (e) {
            setError(e);
        } finally {
            setCargando(false);
        }
    };

    useEffect(()=>{
        onListar();
    }, []);
    
    return {
        data,
        cargando, 
        error
    };

};