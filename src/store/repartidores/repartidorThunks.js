import { getRepartidor, insertRepartidor, getRepartidores, deleteRepartidor, updateRepartidor } from "../../services/repartidores/crud";
import { setMessage, setMessageError } from "../ui/uiSlice";
import { finallyLeer, finallyListar, okEliminar, okGuardar, okLeer, okListar, startEliminar, startGuardar, startLeer, startListar } from "./repartidorSlice";

export const startingListar = ()=>{
    return async ( dispatch )=>{
        dispatch( startListar() );
        try {
            const data = await getRepartidores();
            dispatch( okListar(data) );
        } catch (error) {
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
            const data = await getRepartidor({id});
            dispatch( okLeer(data) );
        } catch (error) {
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
                            ? await insertRepartidor(dataForm)
                            : await updateRepartidor({id, data: dataForm});
            dispatch( okGuardar(data) );
            dispatch( setMessage({
                text: "Guardado correctamente.",
                severity : "success"
            }) );
        } catch (error) {
            dispatch(setMessageError(error?.response?.data?.message));
        } finally{
            dispatch(finallyLeer());
        }
    }
};

export const startingEliminar = ({ id })=>{
    return async ( dispatch )=>{
        dispatch( startEliminar() );
        try {
            await deleteRepartidor({id});
            dispatch( okEliminar(id) );
            dispatch( setMessage({
                text: "Eliminado correctamente.",
                severity : "success"
            }) );
        } catch (error) {
            dispatch(setMessageError(error));
        } finally{
            dispatch(finallyLeer());
        }
    }
};
