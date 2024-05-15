import { useDispatch, useSelector } from "react-redux";
import { startingList, startingSaveEntrega } from "../../../store/entregasRepartidor/entregasRepartidorThunks";
import { closeModal, closeModalSave, seleccionarEntrega } from "../../../store/entregasRepartidor/entregasRepartidorSlice";

export const useConsultarEntregasRepartidor = () =>{
    const { record, recordLoading, records, recordsLoading, recordSavingLoading, openedRecordModal, openedRecordSaveModal } = useSelector( state => state.entregasRepartidor );
    const dispatch = useDispatch();

    const onListarEntregas = async ({idZona, idLocal, idEstado}) => {
        dispatch( startingList({idZona, idLocal, idEstado}) );
    };

    const onGuardarEntrega = (dataForm)=>{
       dispatch( startingSaveEntrega({
            ...dataForm,
            idEntrega: record?.id
       }));
    };

    const onCerrarModalSave = () => {
        dispatch( closeModalSave() );
    };

    const onCerrarModal = () => {
        dispatch( closeModal() );
    };

    const onSeleccionarEntrega = (id) => {
        dispatch( seleccionarEntrega({id}));
    };

    const onSeleccionarEntregaParaEditar = (id) => {
        dispatch( seleccionarEntrega({id, isEditar : true}));
    };

    return {
        registro: record,
        registros : records,
        cargandoRegistro: recordLoading,
        cargandoRegistros: recordsLoading,
        cargandoGuardando : recordSavingLoading,
        flagModal: openedRecordModal,
        flagModalSave: openedRecordSaveModal,
        onListarEntregas,
        onSeleccionarEntrega,
        onSeleccionarEntregaParaEditar,
        onGuardarEntrega,
        onCerrarModal,
        onCerrarModalSave,
    };

};