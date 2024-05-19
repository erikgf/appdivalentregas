import { ListaDespachos, ModalRegistrarDespacho, ModalVerDespacho } from "./component";
import { ModalVerDespachoDetalle } from "./component/ModalVerDespachoDetalle";

export const GestionarDespachos = () => {
   
    return <>
        <ListaDespachos />
        <ModalRegistrarDespacho/>
        <ModalVerDespacho />
        <ModalVerDespachoDetalle />
    </>
};