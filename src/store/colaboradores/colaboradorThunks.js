import { getColaborador, insertColaborador, getColaboradores, deleteColaborador, updateColaborador } from "../../services/colaboradores/crud";
import { setMessage, setMessageError } from "../ui/uiSlice";
import { finallyLeer, finallyListar,
         okEliminar, okGuardar, okLeer, okListar, 
         startEliminar, startGuardar, startLeer, startListar, 
         finallyGuardar,
         finallyEliminar} from "./colaboradorSlice";

export const startingListar = ()=>{
    return async ( dispatch )=>{
        dispatch( startListar() );
        try {
            const data = await getColaboradores();
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
            const data = await getColaborador({id});
            dispatch( okLeer(data) );

        } catch (error) {
            console.log("here")
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
                            ? await insertColaborador(dataForm)
                            : await updateColaborador({id, data: dataForm});
            dispatch( okGuardar(data) );
            dispatch( setMessage({
                text: 'Guardado correctamente.',
                severity: 'success'
            }) );
        } catch (error) {
            dispatch(setMessageError(error));
        } finally{
            dispatch(finallyGuardar());
        }
    }
};

export const startingEliminar = ({ id })=>{
    return async ( dispatch )=>{
        dispatch( startEliminar() );
        try {
            await deleteColaborador({id});
            dispatch( okEliminar(id) );
            dispatch( setMessage({
                text: 'Eliminado correctamente.',
                severity: 'success'
            }) );
        } catch (error) {
            console.error({error});
            dispatch(setMessageError(error));
        } finally{
            dispatch(finallyEliminar());
        }
    }
};
