import { axiosPrivate } from "../../api/axios";

export const deleteZona = async ({id}) => {
    const res = await axiosPrivate.delete(`/zonas/${id}`);
    return res.data;
};


export const getZona = async ({id}) => {
    const res = await axiosPrivate.get(`/zonas/${id}`);
    return res.data;
};

export const getZonas = async () => {
    const res = await axiosPrivate.get(`/zonas`);
    return res.data;
};


export const insertZona = async (data) => {
    const res = await axiosPrivate.post(`/zonas`, data);
    return res.data;
};


export const updateZona = async ({id, data}) => {
    const res = await axiosPrivate.put(`/zonas/${id}`, data);
    return res.data;
};