import { axiosPrivate } from "../../api/axios";

export const getEntregasPorDespacho = async ({id_despacho}) => {
    const res = await axiosPrivate.get(`/entregas-despacho/${id_despacho}`);
    return res.data;
};