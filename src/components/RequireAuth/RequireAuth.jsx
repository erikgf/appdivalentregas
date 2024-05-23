import { useLocation, Navigate, Outlet } from "react-router";
import { LayoutMain } from "../LayoutMain/LayoutMain";
import { useAuth } from "../../hooks/useAuth";
import { FormCambiarClave } from "../../pages/_common/FormCambiarClave/FormCambiarClave";

export const RequireAuth  = ()=>{
    const { user } = useAuth();
    const location = useLocation();

    return (
        user ?  <LayoutMain>
                    <Outlet />
                    <FormCambiarClave />
                </LayoutMain>
             : <Navigate  to = "/login" state ={{from: location}} replace></Navigate>
    )
}