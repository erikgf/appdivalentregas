import { useState } from "react";
import { getImagenDespacho } from "../services/despachos";

export const useGetImagen = () =>{
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(null);
    
    const onObtener = async (url) => {
        setCargando(true);   
        try{
            const data = await getImagenDespacho(url);
            setData(data);
        } catch (e) {
            setError(e);
        } finally {
            setCargando(false);
        }
    };

    return {
        onObtener,
        data,
        cargando, 
        error
    };

};