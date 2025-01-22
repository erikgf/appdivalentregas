import {axiosPrivate} from "../../api/axios";

export const getImagenDespacho = async (url) => {
    const res = await axiosPrivate.post(`/entregas-despacho-imagen`, {
        url
    });
    return res.data;
};