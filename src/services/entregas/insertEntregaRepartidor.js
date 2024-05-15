import { axiosPrivate } from "../../api/axios";

export const insertEntregaRepartidor = async ({
    idEntrega, observaciones, imagenes, latitud, longitud
}) => {
    const datosFrm = new FormData();
    datosFrm.append("observaciones", observaciones);
    datosFrm.append("latitud", latitud);
    datosFrm.append("longitud", longitud);

    for (let i = 0; i < imagenes.length; i++) {
        datosFrm.append("imagenes[]", imagenes[i]);
    }
        
    const headersApiAxios =  { headers : { 'Content-Type' : 'multipart/form-data' } };
    const res = await axiosPrivate.post(`/entregas-despacho-repartidor/${idEntrega}`, datosFrm, headersApiAxios);
    return res.data;
};