import { useEffect, useState } from "react";
import { getClientes } from "../services/clientes";

export const useClienteBean = () =>{
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(null);
    
    const onListar = async () => {
        setCargando(true);   
        try{
            const data = await getClientes();
            setData(data.map(item => {
                return {
                    id: item.id,
                    descripcion: item.razon_social
                }
            }));
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