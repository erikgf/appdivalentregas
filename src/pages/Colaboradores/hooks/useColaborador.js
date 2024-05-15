import { useDispatch, useSelector } from "react-redux";
import { cancelarSeleccionado, startNuevoRegistro } from "../../../store/colaboradores/colaboradorSlice";
import { startingEliminar, startingGuardar, startingLeer, startingListar } from "../../../store/colaboradores/colaboradorThunks";

export const useColaborador = ()=>{
    const dispatch = useDispatch();
    const { openModal, registros, cargandoRegistros, seleccionado, cargandoSeleccionado, cargandoGuardar } = useSelector(state=>state.colaborador);

    const onNuevoRegistro = ()=>{
        dispatch(startNuevoRegistro());
    };

    const onListar = async ()=>{
        dispatch(startingListar());
    };

    const onGuardarRegistro = async (dataForm)=>{
        dispatch(startingGuardar({dataForm, id: seleccionado?.id}));
    };

    const onLeerRegistro = async ({id})=>{
        dispatch(startingLeer({id}));
    };

    const onEliminarRegistro = async ({id})=>{
        dispatch(startingEliminar({id}));
    };

    const onCloseModal = () => {
        dispatch(cancelarSeleccionado());
    };

    return {
        openModal, registros, cargandoRegistros, seleccionado, cargandoSeleccionado, cargandoGuardar,
        onNuevoRegistro, onGuardarRegistro, onListar, onLeerRegistro, onEliminarRegistro,
        onCloseModal
    }
}