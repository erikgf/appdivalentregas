import { getEntregasRepartidor, insertEntregaRepartidor } from "../../services/entregas";
import { setMessage, setMessageError } from "../ui/uiSlice";
import { finallyList, finallySave, okList, okSave, startList, startSave } from "./entregasRepartidorSlice";

export const startingList = ({idZona, idLocal, idEstado})=>{
    return async ( dispatch, getState )=>{
        const { user : { id : idRepartidor} } = getState().auth;
        dispatch( startList() );
        try {
            const data = await getEntregasRepartidor({idRepartidor, idZona, idLocal, idEstado});
            dispatch( okList(data) );
        } catch (error) {
            dispatch(setMessageError(error));
        } finally{
            dispatch(finallyList());
        }
    }
};

/*
export const startingRead = ({ idEntrega })=>{
    return async ( dispatch, getState)=>{
        const { user : { id : idRepartidor} } = getState(state => state.auth );
        dispatch( startRead() );
        try {
            const data = await getEntrega({idEntrega});
            dispatch( okRead(data) );
        } catch (error) {
            console.error({error});
            dispatch(errorRead(error));
        } finally{
            dispatch(finallyRead());
        }
    }
};
*/

export const startingSaveEntrega = (dataForm) =>{
    return async ( dispatch )=>{
        dispatch( startSave() );
        try {
            const data = await insertEntregaRepartidor(dataForm);
            dispatch( okSave(data) );
            dispatch( setMessage({
                text: "Guardado correctamente.",
                severity : "success"
            }) );
        } catch (error) {
            dispatch(setMessageError(error));
        } finally{
            dispatch(finallySave());
        }
    }
};