import { axiosPrivate } from "../../api/axios";

export const deleteCliente = async ({id}) => {
    const res = await axiosPrivate.delete(`/clientes/${id}`);
    return res.data;
};

export const getCliente = async ({id}) => {
    const res = await axiosPrivate.get(`/clientes/${id}`);
    return res.data;
};


export const getClientes = async () => {
    const res = await axiosPrivate.get(`/clientes`);
    return res.data;
};

export const insertCliente = async (data) => {
    const res = await axiosPrivate.post(`/clientes`, data);
    return res.data;
};

export const updateCliente = async ({id, data}) => {
    const res = await axiosPrivate.put(`/clientes/${id}`, data);
    return res.data;
};