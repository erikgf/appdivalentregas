import { processError } from "../../api/processError";
import { logIn } from "../../services/auth";
import { errorLogin, finallyLogin, okLogin, startLogin } from "./authSlice";

export const iniciandoSesion = ({username, password})=>{
    return async ( dispatch )=>{
        dispatch( startLogin() );
        try {
            const data = await logIn({username: username.trim(), password});
            dispatch( okLogin(data) );
        } catch (error) {
            dispatch(errorLogin(processError(error)));
        } finally {
            dispatch( finallyLogin() );
        }
    }
};