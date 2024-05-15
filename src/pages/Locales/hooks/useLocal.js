import { useDispatch, useSelector } from "react-redux";
import { startingEliminar, startingGuardar, startingLeer, startingListar } from "../../../store/locales/localThunks";
import { cancelarSeleccionado, startNuevoRegistro } from "../../../store/locales/localSlice";

export const useLocal = ()=>{
    const dispatch = useDispatch();
    const { openModal, registros, cargandoRegistros, seleccionado, cargandoSeleccionado,
            cargandoGuardar } = useSelector(state=>state.local);

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
        dispatch(startingEliminar|({id}));
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