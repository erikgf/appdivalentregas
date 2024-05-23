import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startingGuardar } from "../../../store/cambiarClave/cambiarClaveThunks";
import { closeModalCambiarClave, openModalCambiarClave } from "../../../store/cambiarClave/cambiarClaveSlice";

export const useFormCambiarClave = () => {
    const dispatch = useDispatch();
    const { registro, openModal, cargandoGuardar } = useSelector(state => state.cambiarClave);

    const onGuardar = (clave) => {
        if (!Boolean(registro)){
            return;
        }
        dispatch( startingGuardar({id : registro?.usuario?.id, clave}) ); 
    };

    const onAbrirModal = (registro) => {
        dispatch ( openModalCambiarClave(registro));
    };

    const onCerrarModal = () => {
        dispatch ( closeModalCambiarClave());
    };

    return {
        registro,
        openModal,
        cargandoGuardar,
        onGuardar,
        onAbrirModal,
        onCerrarModal
    };
};