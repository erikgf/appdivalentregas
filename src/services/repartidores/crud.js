import { axiosPrivate } from "../../api/axios";

export const deleteRepartidor = async ({id}) => {
    const res = await axiosPrivate.delete(`/repartidores/${id}`);
    return res.data;
};

export const getRepartidor = async ({id}) => {
    const res = await axiosPrivate.get(`/repartidores/${id}`);
    return res.data;
};


export const getRepartidores = async () => {
    const res = await axiosPrivate.get(`/repartidores`);
    return res.data;
};

export const insertRepartidor = async (data) => {
    const res = await axiosPrivate.post(`/repartidores`, data);
    return res.data;
};

export const updateRepartidor = async ({id, data}) => {
    const res = await axiosPrivate.put(`/repartidores/${id}`, data);
    return res.data;
};