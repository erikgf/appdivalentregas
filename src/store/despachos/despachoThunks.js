import { deleteDespacho, getDespacho, getDespachos, insertDespacho, updateDespacho } from "../../services/despachos/crud";
import { updateAsignarRepartidores } from "../../services/despachos/updateAsignarRepartidores";
import { setMessage, setMessageError } from "../ui/uiSlice";
import { finallyAsignarRepartidores, finallyDelete, finallyList, finallyRead, finallySave, 
            okAsignarRepartidores, okDelete, okList, okRead, okSave,
            startAsignarRepartidores, startDelete, startList, startRead, startSave } from "./despachoSlice";

export const startingList = ({ fechaInicio, fechaFin })=>{
    return async ( dispatch )=>{
        dispatch( startList() );
        try {
            const data = await getDespachos({fechaInicio, fechaFin});
            dispatch( okList(data) );
        } catch (error) {
            console.error({error});
            dispatch(setMessageError(error));
        } finally{
            dispatch(finallyList());
        }
    }
};

export const startingRead = ({ idDespacho })=>{
    return async ( dispatch )=>{
        dispatch( startRead() );
        try {
            const data = await getDespacho({idDespacho});
            dispatch( okRead(data) );
        } catch (error) {
            console.error({error});
            dispatch(setMessageError(error));
        } finally{
            dispatch(finallyRead());
        }
    }
};

export const startingAsignarRepartidores = ({entregas}) => {
    return async ( dispatch )=>{
        dispatch( startAsignarRepartidores() );
        try {
            const data = await updateAsignarRepartidores(entregas);
            dispatch( okAsignarRepartidores(data) );
            dispatch( setMessage({
                text: `${data?.length} Repartidores asignados correctamente.`,
                severity: 'success'
            }) );
        } catch (error) {
            console.error({error});
            dispatch(setMessageError(error));
        } finally{
            dispatch(finallyAsignarRepartidores());
        }
    }
};

export const startingSave = ({dataForm, id}) =>{
    return async ( dispatch )=>{
        dispatch( startSave() );
        try {
            const editando = Boolean(id);

            const data = !editando
                            ? await insertDespacho(dataForm)
                            : await updateDespacho({id, data: dataForm});

            dispatch( okSave(data) );
            dispatch( setMessage({
                text: 'Guardado correctamente.',
                severity: 'success'
            }) );

        } catch (error) {
            console.error({error});
            dispatch(setMessageError(error));
        } finally{
            dispatch(finallySave());
        }
    }

};

export const startingDelete = ({id}) => {
    return async ( dispatch )=>{
        dispatch( startDelete() );
        try {
            const data = await deleteDespacho(id);
            dispatch( okDelete(data) );
            dispatch( setMessage({
                text: 'Eliminado correctamente.',
                severity: 'success'
            }) );
        } catch (error) {
            console.error({error});
            dispatch(setMessageError(error));
        } finally{
            dispatch(finallyDelete());
        }
    }

};