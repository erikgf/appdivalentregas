import { axiosPrivate } from "../../api/axios";

export const getEntregasCliente = async ({idEstado, fechaInicio, fechaFin}) => {
    const paramsData = new URLSearchParams({
        id_estado: idEstado, fecha_inicio: fechaInicio, fecha_fin: fechaFin
    });
    const res = await axiosPrivate.get(`/entregas-despacho-cliente?${paramsData.toString()}`);
    return res.data;
};