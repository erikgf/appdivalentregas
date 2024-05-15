import { updateEntregaModificable } from "../../services/entregas/updateEntregasModificable";
import { finallyEntregaModificable, okEntregaModificable, startEntregaModificable } from "../despachos/despachoSlice";
import { setMessage, setMessageError } from "../ui/uiSlice";
import { finallyDelete, finallyList, 
            finallyRead, finallySave, okDelete, okList, 
            okRead, okSave, startDelete, startList, startRead, startSave } from "./entregasSlice";


export const startingListXDespacho = ({ idDespacho })=>{
    return async ( dispatch )=>{
        dispatch( startList() );
        try {
            const data = await getEntregasXDespacho({idDespacho});
            dispatch( okList(data) );
        } catch (error) {
            console.error({error});
            dispatch(setMessageError(error));
        } finally{
            dispatch(finallyList());
        }
    }
};

export const startingList = ({ fechaInicio, fechaFin })=>{
    return async ( dispatch )=>{
        dispatch( startList() );
        try {
            const data = await getEntregas({fechaInicio, fechaFin});
            dispatch( okList(data) );
        } catch (error) {
            console.error({error});
            dispatch(setMessageError(error));
        } finally{
            dispatch(finallyList());
        }
    }
};

export const startingRead = ({ idEntrega })=>{
    return async ( dispatch )=>{
        dispatch( startRead() );
        try {
            const data = await getEntrega({idEntrega});
            dispatch( okRead(data) );
        } catch (error) {
            console.error({error});
            dispatch(setMessageError(error));
        } finally{
            dispatch(finallyRead());
        }
    }
};

export const startingSave = ({data: dataForm, id}) =>{
    return async ( dispatch )=>{
        dispatch( startSave() );
        try {
            const data = Boolean(id) 
                              ? await insertEntrega(dataForm)
                              : await updateEntrega(id, dataForm);
            dispatch( okSave(data) );
            dispatch( setMessage({
                text: "Guardado correctamente.",
                severity : "success"
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
            const data = await deleteEntrega(id);
            dispatch( okDelete(data) );
            dispatch( setMessage({
                text: "Eliminado correctamente.",
                severity : "success"
            }) );
        } catch (error) {
            console.error({error});
            dispatch(setMessageError(error));
        } finally{
            dispatch(finallyDelete());
        }
    }
};

export const startingEsModificable = ({ idEntrega, modificable })=>{
    return async ( dispatch )=>{
        dispatch( startEntregaModificable());
        try {
            await updateEntregaModificable({idEntrega, modificable});
            dispatch( okEntregaModificable({idEntrega, modificable}));
        } catch (error) {
            console.error({error});
            dispatch(setMessageError(error));
        } finally{
            dispatch(finallyEntregaModificable());
        }
    }
};

