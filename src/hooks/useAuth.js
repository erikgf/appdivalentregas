import { useDispatch, useSelector } from "react-redux";
import { clearErrorLogin, startLogOut } from "../store/auth/authSlice";
import { useEffect } from "react";
import { iniciandoSesion } from "../store/auth/authThunks";
import { logOut } from "../services/auth";

export const useAuth = () => {
    const dispatch = useDispatch();
    const { user, token, cargandoLogin, messageLogin } = useSelector(state=>state.auth);

    const onIniciarSesion = async ({username, password}) => {
        dispatch(iniciandoSesion({username, password}));
    };

    const onCerrarSesion = ()=>{
        logOut();
        setTimeout(()=>{
            dispatch( startLogOut() );
        }, 400)
    };

    useEffect(()=>{
        let timer = setTimeout(()=>{
            dispatch(clearErrorLogin());
        }, 4000);
        return ()=>{
            if (timer)
                clearTimeout(timer);
        }
    }, [messageLogin]);

    return {
        //* Propiedades
        user,
        token,
        isLoggedIn  : Boolean(user),
        cargandoLogin,
        messageLogin,
        //* Métodos
        onIniciarSesion, onCerrarSesion
    }
}