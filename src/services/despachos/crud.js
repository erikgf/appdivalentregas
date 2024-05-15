import { axiosPrivate } from "../../api/axios";

export const deleteDespacho = async ({id}) => {
    const res = await axiosPrivate.delete(`/despachos/${id}`);
    return res.data;
};

export const getDespacho = async ({idDespacho}) => {
    const res = await axiosPrivate.get(`/despachos/${idDespacho}`);
    return res.data;
};

export const getDespachos = async ({fechaInicio, fechaFin}) => {
    const paramsData = new URLSearchParams({
        fechaInicio, fechaFin
    });
    const res = await axiosPrivate.get(`/despachos?${paramsData.toString()}`);
    return res.data;
};

export const insertDespacho = async (data) => {
    const res = await axiosPrivate.post(`/despachos`, data);
    return res.data;
};

export const updateDespacho = async ({id, data}) => {
    const res = await axiosPrivate.put(`/despachos/${id}`, data);
    return res.data;
};