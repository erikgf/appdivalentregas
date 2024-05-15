import { axiosPrivate } from "../../api/axios";

export const deleteLocal = async ({id}) => {
    const res = await axiosPrivate.delete(`/locales/${id}`);
    return res.data;
};

export const getLocal = async ({id}) => {
    const res = await axiosPrivate.get(`/locales/${id}`);
    return res.data;
};

export const getLocales = async () => {
    const res = await axiosPrivate.get(`/locales`);
    return res.data;
};

export const insertLocal = async (data) => {
    const res = await axiosPrivate.post(`/locales`, data);
    return res.data;
};

export const updateLocal = async ({id, data}) => {
    const res = await axiosPrivate.put(`/locales/${id}`, data);
    return res.data;
};