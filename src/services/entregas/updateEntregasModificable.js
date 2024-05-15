import { axiosPrivate } from "../../api/axios";

export const updateEntregaModificable = async ({idEntrega, modificable}) => {
    const res = await axiosPrivate.post(`/entregas-despacho-repartidor/modificable/${idEntrega}`, {
        modificable
    });
    return res.data;
};
