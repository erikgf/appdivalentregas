import { useState } from "react";
import { CabeceraBuscar, ListaEntregas } from "./components";
import { ModalRegistrarEntrega } from "./components/ModalRegistrarEntrega";
import { useConsultarEntregasCliente } from "./hooks/useConsultarEntregasCliente";
import constants from "../../data/constants";

export const ConsultarEntregasCliente = ()=> {
    const [ modoExterno, setModoExterno ] = useState(false);
    const { onListar, onSeleccionar, setFlagModal, 
            registro, flagModal, data, error, cargando, 
            zonas, locales} = useConsultarEntregasCliente({setModoExterno});
    const [idZona, setIdZona] = useState(constants.ESTADO_TODOS);
    const [idLocal, setIdLocal] = useState(constants.ESTADO_TODOS);

    return  <>
                <CabeceraBuscar setModoExterno = {setModoExterno} onListar = {onListar}  setIdLocal = { setIdLocal } setIdZona = { setIdZona } />
                <ListaEntregas modoExterno = { modoExterno } idZona = { idZona } setIdZona = { setIdZona } idLocal = { idLocal } setIdLocal = { setIdLocal } data = {data} listaZonas = {zonas} listaLocales = {locales} error = {error} cargando = {cargando} onSeleccionar = {onSeleccionar}/>
                <ModalRegistrarEntrega registro={registro} flagModal={flagModal} setFlagModal={setFlagModal}/>
            </>
    };