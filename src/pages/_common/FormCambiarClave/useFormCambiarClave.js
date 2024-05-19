import { useDispatch, useSelector } from "react-redux";
import { startingGuardar } from "../../../store/cambiarClave/cambiarClaveThunks";

export const useFormCambiarClave = () => {
    const dispatch = useDispatch();
    const { registro, cargandoGuardar } = useSelector(state => state.cambiarClave);
    const onGuardar = (clave) => {
        dispatch( startingGuardar({id: registro?.id, clave}) ); 
    };

    return {
        registro,
        cargandoGuardar,
        flagModal : !Boolean(registro),
        onGuardar
    };
};