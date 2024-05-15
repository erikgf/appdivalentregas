import { axiosPrivate } from "../../api/axios";

export const getEntregasRepartidor = async ({idRepartidor, idZona, idLocal, idEstado}) => {
    const paramsData = new URLSearchParams({
        id_repartidor: idRepartidor, 
        id_zona: idZona, 
        id_local: idLocal, 
        id_estado: idEstado
    });
    const res = await axiosPrivate.get(`/entregas-despacho-repartidor?${paramsData.toString()}`);
    return res.data;
};



export const getEntregasRepartidorPorId = async ({idRepartidor, idEntrega}) => {
    const paramsData = new URLSearchParams({
        id_repartidor: idRepartidor, 
    });
    const res = await axiosPrivate.get(`/entregas-despacho-repartidor/${idEntrega}?${paramsData.toString()}`);
    return res.data;
};