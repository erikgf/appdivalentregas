import { axiosPrivate } from "../../api/axios";

export const getZonasRepartidor = async () => {
    const res = await axiosPrivate.get(`/repartidores-zonas`);
    return res.data;
};