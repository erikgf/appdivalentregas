import { axiosPrivate } from "../../api/axios";

export const deleteColaborador = async ({id}) => {
    const res = await axiosPrivate.delete(`/colaboradores/${id}`);
    return res.data;
};

export const getColaborador = async ({id}) => {
    const res = await axiosPrivate.get(`/colaboradores/${id}`);
    return res.data;
};

export const getColaboradores = async () => {
    const res = await axiosPrivate.get(`/colaboradores`);
    return res.data;
};

export const insertColaborador = async (data) => {
    const res = await axiosPrivate.post(`/colaboradores`, data);
    return res.data;
};

export const updateColaborador = async ({id, data}) => {
    const res = await axiosPrivate.put(`/colaboradores/${id}`, data);
    return res.data;
};