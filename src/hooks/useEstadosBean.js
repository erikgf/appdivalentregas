import { useEffect, useState } from "react";

export const useEstadosBean = () =>{
    const [data, setData] = useState(null);
    
    const onListar = async () => {
        setData([
            {id: "T", descripcion: "EN TRANSITO"},
            {id: "P", descripcion:" EN PROCESO ENTREGA"},
            {id: "E", descripcion:" ENTREGADO"},
        ]);
    };

    useEffect(()=>{
        onListar();
    }, []);
    
    return {
        data,
    };

};