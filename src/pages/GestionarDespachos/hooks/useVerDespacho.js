import { useDispatch, useSelector } from "react-redux";
import { cerrarEntregaDetalle, closeModal, habilitarModoEditar, toggleCheckAllEntregas, toggleCheckEntrega, verEntregaDetalle } from "../../../store/despachos/despachoSlice";
import { startingAsignarRepartidores, startingRead } from "../../../store/despachos/despachoThunks";
import { startingEsModificable } from "../../../store/entregas/entregasThunks";

export const useVerDespacho = () => {
    const { record, recordLoading, recordDetail, openedRecordDetailModal, openedRecordModal,  
                recordAsignarRepartidoresLoading, recordModificabling, recordEditingLoading}  = useSelector(state=>state.despacho);
    const dispatch = useDispatch();

    const onLeerDespacho = async ({idDespacho}) => {
        dispatch( startingRead({idDespacho}) );
    };

    const onLimpiarRegistro = () => {
        dispatch(closeModal());
    };

    const onToggleAllEntregas = (checked)=>{
        dispatch( toggleCheckAllEntregas({checked}) );
    };

    const onToggleEntrega = (idEntrega)=>{
        dispatch( toggleCheckEntrega({idEntrega}) );
    };

    const onAsignarRepartidores = ()=>{
        const entregasSeleccionadas = record?.entregas?.filter( entrega => {
            return Boolean(entrega.checked);
        }).map( entrega => {
            return {
                id_entrega : entrega.id
            }
        });

        dispatch( startingAsignarRepartidores({entregas: entregasSeleccionadas}) );
    };

    const onVerEntregaDetalle = ({idEntrega}) => {
        dispatch( verEntregaDetalle(idEntrega) );
    };

    const onCerrarEntregaDetalle = () =>{
        dispatch( cerrarEntregaDetalle ());
    };

    const onEntregaEsModificable = ({idEntrega, modificable}) => {
        dispatch( startingEsModificable({idEntrega, modificable}))
    };

    const onHabilitarModificarDespachos = () => {
        dispatch( habilitarModoEditar() );
    };

    return {
        registro : record,
        entregas: record?.entregas,
        cargandoRegistro: recordLoading,
        flagModal: openedRecordModal,
        cargandoAsignacion : recordAsignarRepartidoresLoading,
        entregaDetalle: recordDetail, 
        flagModalDetalle: openedRecordDetailModal, 
        cargandoModificando: recordModificabling,
        cargandoLeerEditarRegistro: recordEditingLoading,
        onLeerDespacho,
        onLimpiarRegistro,
        onToggleAllEntregas,
        onToggleEntrega,
        onAsignarRepartidores,
        onVerEntregaDetalle,
        onCerrarEntregaDetalle,
        onEntregaEsModificable,
        onHabilitarModificarDespachos
    };

};