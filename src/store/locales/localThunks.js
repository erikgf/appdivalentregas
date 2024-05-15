import { getLocal, insertLocal, getLocales, deleteLocal, updateLocal } from "../../services/locales/crud";
import { setMessage, setMessageError } from "../ui/uiSlice";
import { finallyLeer, finallyListar, okEliminar, okGuardar, okLeer, okListar, startEliminar, startGuardar, startLeer, startListar } from "./localSlice";

export const startingListar = ()=>{
    return async ( dispatch )=>{
        dispatch( startListar() );
        try {
            const data = await getLocales();
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
            const data = await getLocal({id});
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
                            ? await insertLocal(dataForm)
                            : await updateLocal({id, data: dataForm});
            dispatch( okGuardar(data) );
            dispatch( setMessage({
                text: "Guardado correctamente.",
                severity : "success"
            }) );
        } catch (error) {
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
            const data = await deleteLocal({id});
            dispatch( okEliminar(data) );
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
