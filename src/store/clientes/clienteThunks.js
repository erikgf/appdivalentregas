import { getCliente, insertCliente, getClientes, deleteCliente, updateCliente } from "../../services/clientes/crud";
import { setMessage, setMessageError } from "../ui/uiSlice";
import { finallyLeer, finallyListar, okEliminar, okGuardar, okLeer, okListar, startEliminar, startGuardar, startLeer, startListar } from "./clienteSlice";

export const startingListar = ()=>{
    return async ( dispatch )=>{
        dispatch( startListar() );
        try {
            const data = await getClientes();
            dispatch( okListar(data) );
        } catch (error) {
            console.error({error});
            dispatch(setMessageError(error));
        } finally{
            dispatch(finallyListar());
        }
    }
};

export const startingLeer = ({id})=>{
    return async ( dispatch )=>{
        dispatch( startLeer() );
        try {
            const data = await getCliente({id});
            dispatch( okLeer(data) );
        } catch (error) {
            console.error({error});
            dispatch(setMessageError(error));
        } finally{
            dispatch(finallyLeer());
        }
    }
};

export const startingGuardar = ({dataForm, id})=>{
    return async ( dispatch )=>{
        dispatch( startGuardar() );
        try {
            const data = !Boolean(id) 
                            ? await insertCliente(dataForm)
                            : await updateCliente({id, data: dataForm});
            dispatch( okGuardar(data) );
            dispatch( setMessage({
                text: 'Guardado correctamente.',
                severity: 'success'
            }) );
        } catch (error) {
            console.error({error});
            dispatch(setMessageError(error));
        } finally{
            dispatch(finallyLeer());
        }
    }
};

export const startingEliminar = ({ id })=>{
    return async ( dispatch )=>{
        dispatch( startEliminar() );
        try {
            await deleteCliente({id});
            dispatch( okEliminar(id) );
            dispatch( setMessage({
                text: 'Eliminado correctamente.',
                severity: 'success'
            }) );
        } catch (error) {
            console.error({error});
            dispatch(setMessageError(error));
        } finally{
            dispatch(finallyLeer());
        }
    }
};
