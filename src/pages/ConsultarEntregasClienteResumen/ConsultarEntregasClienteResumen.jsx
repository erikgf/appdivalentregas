import { useState } from "react";
import { getHoy } from "../../assets/utils";
import { CabeceraBuscar, BloquePieResumen } from "./components";
import { useConsultarEntregasClienteResumen } from "./hooks/useConsultarEntregasClienteResumen";
import { useNavigate } from "react-router-dom";
import constants from "../../data/constants";

const hoy = getHoy();
const defaultValue = {
    idEstado : constants.ESTADO_TODOS,
    fechaInicio: hoy,
    fechaFin: hoy
};

export const ConsultarEntregasClienteResumen = ()=> {
    const { onListar, data, cargando, zonas, locales} = useConsultarEntregasClienteResumen();
    const [paramsBusqueda, setParamsBusqueda] = useState(defaultValue)

    const navigate = useNavigate();

    const ir = ({dataIndex, id_zona, id_local}) => {
        let idEstado = "T";
        if (dataIndex == 1){
            idEstado ="P";
        } 

        if (dataIndex == 2){
            idEstado = "E";
        }

        navigate(`/consultar-entregas-cliente?z=${id_zona}&l=${id_local}&e=${idEstado}&fi=${paramsBusqueda?.fechaInicio}&ff=${paramsBusqueda?.fechaFin}`);
    }
    
    return <>
            <CabeceraBuscar onListar = {onListar} paramsBusqueda = {paramsBusqueda} setParamsBusqueda = {setParamsBusqueda}/>
            <BloquePieResumen data = { data }  cargando = { cargando } ir = {ir} listaZonas = {zonas} listaLocales = {locales} />
        </>
};