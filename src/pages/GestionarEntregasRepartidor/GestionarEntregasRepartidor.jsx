import { CabeceraBuscar } from "./components/CabeceraBuscar";
import { ListaEntregas } from "./components/ListaEntregas";
import { ModalRegistrarEntrega } from "./components/ModalRegistrarEntrega";
import { ModalRegistrarEntregaVer } from "./components/ModalRegistrarEntregaVer";

export const GestionarEntregasRepartidor = () =>  {
    return <>
            <CabeceraBuscar />
            <ListaEntregas />
            <ModalRegistrarEntrega />
            <ModalRegistrarEntregaVer />
        </>
};  