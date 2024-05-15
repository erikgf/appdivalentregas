import { useEffect, useState } from "react";
import { getLocalesRepartidor } from "../services/locales";

export const useLocalRepartidoresBean = () =>{
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(null);
    
    const onListar = async () => {
        setCargando(true);   
        try{
            const data = await getLocalesRepartidor();
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