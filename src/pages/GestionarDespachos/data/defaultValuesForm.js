import { getHoy } from "../../../assets/utils";

export const defaultValuesForm = {
    fecha_registro: getHoy(),
    serie_guia: "",
    numero_guia: "",
    tienda_origen: {
        id_tienda: "",
        codigo_tienda: "",
        nombre_tienda: "",
        ruta_tienda: "",
    },
    tienda_destino: {
        id_tienda: "",
        codigo_tienda: "",
        nombre_tienda: "",
        ruta_tienda: "",
    },
    tipo_bulto: {
        id_tipo_bulto: "",
        descripcion: ""
    },
    cantidad_bultos: "",
    responsable: {
        id_responsable: "",
        apellidos_nombres: ""
    }

}