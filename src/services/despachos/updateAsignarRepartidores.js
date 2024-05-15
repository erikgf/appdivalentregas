import {axiosPrivate} from "../../api/axios";

export const updateAsignarRepartidores = async (entregas) => {
    const res = await axiosPrivate.post(`/despachos-asignar`, entregas);
    return res.data;
};