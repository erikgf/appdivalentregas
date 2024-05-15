import { axiosPrivate } from "../../api/axios";

export const getLocalesRepartidor = async () => {
    const res = await axiosPrivate.get(`/repartidores-locales`);
    return res.data;
};