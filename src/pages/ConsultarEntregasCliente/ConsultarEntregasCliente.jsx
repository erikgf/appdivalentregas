import { CabeceraBuscar, ListaEntregas } from "./components";
import { ModalRegistrarEntrega } from "./components/ModalRegistrarEntrega";
import { useConsultarEntregasCliente } from "./hooks/useConsultarEntregasCliente";

export const ConsultarEntregasCliente = ()=> {
    const { onListar, onSeleccionar, setFlagModal, 
            registro, flagModal, data, error, cargando} = useConsultarEntregasCliente();
   
    return  <>
                <CabeceraBuscar onListar = {onListar} />
                <ListaEntregas data = {data} error = {error} cargando = {cargando} onSeleccionar = {onSeleccionar}/>
                <ModalRegistrarEntrega registro={registro} flagModal={flagModal} setFlagModal={setFlagModal}/>
            </>
    };