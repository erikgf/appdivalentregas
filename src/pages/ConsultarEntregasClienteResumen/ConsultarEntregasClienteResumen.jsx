import { useState } from "react";
import { getHoy } from "../../assets/utils";
import { CabeceraBuscar, BloquePieResumen } from "./components";
import { useConsultarEntregasCliente } from "./hooks/useConsultarEntregasCliente";
import { useNavigate } from "react-router-dom";

const hoy = getHoy();
const defaultValue = {
    idZona: "*",
    idLocal: "*",
    idEstado : "*",
    fechaInicio: hoy,
    fechaFin: hoy
};

export const ConsultarEntregasClienteResumen = ()=> {
    const { onListar, data, error, cargando} = useConsultarEntregasCliente();
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

        console.log({dataIndex})

        navigate(`/consultar-entregas-cliente?z=${id_zona}&l=${id_local}&e=${idEstado}&fi=${paramsBusqueda?.fechaInicio}&ff=${paramsBusqueda?.fechaFin}`);
        console.log(idEstado, paramsBusqueda);
    }
    
    return <>
            <CabeceraBuscar onListar = {onListar} paramsBusqueda = {paramsBusqueda} setParamsBusqueda = {setParamsBusqueda}/>
            <BloquePieResumen data = { data }  cargando = { cargando } ir = {ir} />
        </>
};