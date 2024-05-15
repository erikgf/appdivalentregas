import { useDispatch, useSelector } from "react-redux";
import { startingDelete, startingList, startingSave } from "../../../store/despachos/despachoThunks";
import { closeModal, startNewRecord } from "../../../store/despachos/despachoSlice";

export const useGestionarDespachos = () => {
    const dispatch = useDispatch();
    const { record, records, recordsLoading, recordSavingLoading, openedRecordSaveModal, recordDeleting}  = useSelector(state=>state.despacho);

    const onIniciarNuevoRegistro = () => {
        dispatch (startNewRecord() );
    };

    const onListarDespachos = async ({fechaFin, fechaInicio}) => {
        dispatch( startingList({fechaFin, fechaInicio}) );
    };

    const onGuardarDespacho = (data, id)=>{
        const dataForm = {
            ...data,
            entregas: data.entregas.map ( entrega => {
                return {
                    id : entrega.backend ? entrega.id : null,
                    id_local: entrega.local.id,
                    numero_cajas: entrega.numero_cajas,
                    numero_gavetas: entrega.numero_gavetas,
                    numero_guias: entrega.numero_guias
                }
            })
        }

       dispatch( startingSave({dataForm, id}) );
    };

    const onCerrarModal = () => {
        dispatch( closeModal() );
    };


    const onEliminarRegistro =  (id) => {
        dispatch( startingDelete({id}) );
    };

    return {
        registro: record,
        registros : records,
        cargandoRegistros: recordsLoading,
        cargandoGuardando : recordSavingLoading,
        flagModal: openedRecordSaveModal,
        cargandoEliminando: recordDeleting,
        onIniciarNuevoRegistro,
        onListarDespachos,
        onGuardarDespacho,
        onCerrarModal,
        onEliminarRegistro
    };
};