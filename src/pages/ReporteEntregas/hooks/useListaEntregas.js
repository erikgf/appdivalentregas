import { useDispatch, useSelector } from "react-redux";
import { startingList } from "../../../store/reporteEntregas/reporteEntregasThunks";

export const useListaEntregas = () => {
    const dispatch = useDispatch();
    const { records, recordsLoading}  = useSelector(state=>state.reporteEntregas);

    const onListarDespachos = async ({fechaFin, fechaInicio}) => {
        dispatch( startingList({fechaFin, fechaInicio}) );
    };

    return {
        registros : records,
        cargandoRegistros: recordsLoading,
        onListarDespachos,
    };
};