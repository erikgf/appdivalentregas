import { FormCambiarClave } from "../_common/FormCambiarClave/FormCambiarClave";
import { FormRegister } from "./components/FormRegister";
import { ListaRegistros } from "./components/ListaRegistros";

export const Clientes = ()=>{
    return <>
            <ListaRegistros />
            <FormRegister />
            <FormCambiarClave />
        </>
}