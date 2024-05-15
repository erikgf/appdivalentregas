import { axiosPrivate } from "../../api/axios";

export const getEntregasCliente = async ({idCliente, idZona, idLocal, idEstado, fechaInicio, fechaFin}) => {
    const paramsData = new URLSearchParams({
        id_cliente: idCliente, id_zona: idZona, id_local: idLocal, id_estado: idEstado, fecha_inicio: fechaInicio, fecha_fin: fechaFin
    });
    const res = await axiosPrivate.get(`/entregas-despacho-cliente?${paramsData.toString()}`);
    return res.data;
};