import { getEntregas } from "../../services/entregas";
import { setMessageError } from "../ui/uiSlice";
import { finallyList, okList, startList } from "./reporteEntregasSlice";

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

