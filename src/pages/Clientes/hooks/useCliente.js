import { useDispatch, useSelector } from "react-redux";
import { startingEliminar, startingGuardar, startingLeer, startingListar } from "../../../store/clientes/clienteThunks";
import { cancelarSeleccionado, startNuevoRegistro } from "../../../store/clientes/clienteSlice";

export const useCliente = ()=>{
    const dispatch = useDispatch();
    const { openModal, registros, cargandoRegistros, seleccionado, cargandoSeleccionado, cargandoGuardar } = useSelector(state=>state.cliente);

    const onNuevoRegistro = ()=>{
        dispatch(startNuevoRegistro());
    };

    const onListar = async ()=>{
        dispatch(startingListar());
    };

    const onGuardarRegistro = async (dataForm)=>{
        dispatch(startingGuardar({
            dataForm : {
                ...dataForm, 
                formato_entregas : dataForm.formato_entregas.map(({key, name, type}) => ({key, name, type})) 
            }, 
            id: seleccionado?.id
        }));
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
        onNuevoRegistro, onGuardarRegistro, onListar, onLeerRegistro, onEliminarRegistro, onCloseModal
    }
}