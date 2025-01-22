import { createSlice } from "@reduxjs/toolkit";

export const despachoSlice = createSlice({
   name : 'despachos',
   initialState : {
        records: null,
        recordsLoading : false,
        record : null,
        recordLoading: false,
        recordSavingLoading : false,
        recordDeleting : false,
        openedRecordSaveModal : false,
        openedRecordModal : false,
        recordAsignarRepartidoresLoading : false,
        recordDetail: null,
        openedRecordDetailModal : false,
        recordModificabling: false,
   },
   reducers : {
        startList : (state) =>{
            state.recordsLoading = true;
            state.records = [];
        },
        okList : (state, {payload})=>{
            state.records = payload.map ( e  => {
                let entregas_cantidad = "";
                if (e.entregas_count > 0){
                    entregas_cantidad = parseFloat(e.entregas_entregadas_count / e.entregas_count * 100).toFixed(2);
                } else {
                    entregas_cantidad = 0.00;
                }

                return {
                    id: e.id,
                    fechaRegistro: e.fecha_registro,
                    secuencia: e.secuencia,
                    observaciones: e.observaciones,
                    cliente: e?.cliente.razon_social,
                    entregas_cantidad: `${e.entregas_entregadas_count}/${e.entregas_count} (${entregas_cantidad} %)`,
                    cajas_cantidad: e.entregas_sum_numero_cajas,
                    gavetas_cantidad: e.entregas_sum_numero_gavetas,
                    guias_cantidad: e.entregas_sum_numero_guias,
                }
            });
        },
        finallyList : (state) => {
            state.recordsLoading = false;
        },
        startNewRecord : (state) => {
            state.record = null;
            state.recordLoading = false;
            state.openedRecordSaveModal = true;
        },
        startRead : (state) => {
            state.record = null;
            state.recordLoading = true;
        },
        okRead : ( state, { payload : despacho }) => {
            const formato_entregas = JSON.parse(despacho?.formato_entregas.estructura).map( item => ({...item, total: 0}));
            const entregas = despacho.entregas.map( entrega => {
                const valores_formato  = JSON.parse(entrega?.valores_formato);
                formato_entregas.forEach((forma_entrega, i) => {
                    if (forma_entrega.type === "integer"){
                        formato_entregas[i].total += parseFloat(valores_formato[forma_entrega.key]);
                    }
                });

                return {
                    ...entrega,
                    valores_formato,
                    checked: false,
                }
            });

            const record = {
                ...despacho,
                cliente: {
                    ...despacho.cliente,
                    formato_entregas
                },
                formato_entregas : formato_entregas.map( item => ({...item, total: parseInt(item.total)})),
                entregas: entregas.map ( item => {
                    return {
                        ...item,
                        ...item.valores_formato
                    }
                })
            };

            state.record = record;
            state.openedRecordModal = true;
        },
        finallyRead : ( state ) => {
            state.recordLoading = false;
        },
        cancelRead: ( state ) => {
            state.record = null;
            state.recordLoading = false;
        },
        startSave: ( state) => {
            state.recordSavingLoading = true;
        },
        okSave : ( state, { payload }) => {
            let entregas_cantidad = "";
            if (payload.entregas_count > 0){
                entregas_cantidad = parseFloat(payload.entregas_entregadas_count / payload.entregas_count * 100).toFixed(2);
            } else {
                entregas_cantidad = 0.00;
            }

            const formato_entregas = JSON.parse(payload?.formato_entregas.estructura).map( item => ({...item, total: 0}));
            const entregas = payload.entregas.map( entrega => {
                const valores_formato  = JSON.parse(entrega?.valores_formato);
                formato_entregas.forEach((forma_entrega, i) => {
                    if (forma_entrega.type === "integer"){
                        formato_entregas[i].total += parseFloat(valores_formato[forma_entrega.key]);
                    }
                    formato_entregas[i].total = parseFloat(formato_entregas[i].total).toFixed(0);
                });

                return {
                    ...entrega,
                    valores_formato,
                    checked: false,
                }
            });

            const newRecord = {
                id : payload.id,
                fechaRegistro: payload.fecha_registro,
                secuencia: payload.secuencia,
                observaciones: payload.observaciones,
                cliente: payload?.cliente.razon_social,
                entregas_cantidad: `${payload.entregas_entregadas_count}/${payload.entregas_count} (${entregas_cantidad} %)`,
            };

            if (!Boolean(state.record?.id)){
                state.records.push(newRecord);
            } else {
                state.records = state.records.map( item =>{
                    if (item.id === state.record.id){
                        return newRecord;
                    }
                    return item;
                })
            }
             
            state.openedRecordSaveModal = false;
            state.openedRecordModal = true;
            state.record = {
                ...payload,
                formato_entregas : formato_entregas.map( item => ({...item, total: parseInt(item.total)})),
                entregas,
            };

        },
        finallySave: ( state ) => {
            state.recordSavingLoading = false;
        },
        startDelete: ( state) => {
            state.recordDeleting = true;
        },
        okDelete : ( state, { payload : id }) => {
            state.records = state.records.filter( record =>{
                return record.id != id
            });
        },
        finallyDelete : ( state ) => {
            state.recordDeleting = false;
        },
        closeModal : (state) => {
            state.openedRecordModal = false;
            state.openedRecordSaveModal = false;
        },
        toggleCheckAllEntregas : ( state, { payload : {checked} }) => {
            state.record.entregas = state.record?.entregas.map ( entrega => {
                if (entrega.puedo_asignar){
                    return {
                        ...entrega,
                        checked: checked
                    }
                }
                return entrega;
            });
        },
        toggleCheckEntrega : ( state, { payload : { idEntrega } }) => {
            state.record.entregas = state.record?.entregas.map ( entrega => {
                if (entrega.id === idEntrega){
                    return {
                        ...entrega,
                        checked: !entrega.checked
                    }
                }
                return entrega;
            })
        },
        startAsignarRepartidores: ( state) => {
            state.recordAsignarRepartidoresLoading = true;
        },
        okAsignarRepartidores : ( state, { payload : entregasConRepartidor }) => {
            const cantidadEntregasRepartidor = entregasConRepartidor?.length;
            state.record.entregas = state.record?.entregas.map( entrega => {
                const entregaProcesarIndex = entregasConRepartidor.findIndex(e => e.id_entrega === entrega.id);
                const entregaProcesar = entregasConRepartidor[entregaProcesarIndex];
                entregasConRepartidor.slice(entregaProcesarIndex, 1);

                if (Boolean(entregaProcesar)){
                    return {
                        ...entrega,
                        checked: false,
                        puedo_asignar : false,
                        repartidor: entregaProcesar.repartidor,
                        estado: entregaProcesar.estado
                    }
                }
                return entrega;
            });

            state.record.data_pie = state.record.data_pie.map( itemPie => {
                let nuevaCantidad = itemPie.cantidad;

                if (itemPie.id === "T"){
                    nuevaCantidad -= cantidadEntregasRepartidor;
                }

                if (itemPie.id === "P"){
                    nuevaCantidad += cantidadEntregasRepartidor;
                }

                return {
                    ...itemPie,
                    cantidad: nuevaCantidad
                };
            })
            
        },
        finallyAsignarRepartidores : ( state ) => {
            state.recordAsignarRepartidoresLoading = false;
        },
        verEntregaDetalle : ( state, { payload: idEntrega}) => {
            state.openedRecordDetailModal = true
            const detail = state.record.entregas?.find( entrega => entrega.id === idEntrega);
            const estructura = state?.record?.formato_entregas; 
            const valores_formato = detail?.valores_formato;

            const valores =  Boolean(valores_formato && estructura)
                ? estructura.map( _item => {
                    return {
                        key: _item.key,
                        label: _item.name,
                        value: Boolean(valores_formato) ? valores_formato[_item.key] : null
                    }
                })
                : []
                
            detail.images = Boolean(state.recordDetail?.cadena_fotos) 
                                ? JSON.parse(state.recordDetail.cadena_fotos)
                                : null;
            detail.valores = valores;
            state.recordDetail = detail;
        },
        cerrarEntregaDetalle : ( state )  => {
            state.openedRecordDetailModal = false;
            state.recordDetail = null;
        },
        startEntregaModificable: ( state) => {
            state.recordModificabling = true;
        },
        okEntregaModificable : ( state, { payload }) => {
            const { idEntrega, modificable } = payload;

            state.record.entregas =  state.record.entregas.map(entrega =>{
                if(entrega.id != idEntrega){
                    return {
                        ...entrega, es_modificable : modificable,
                    };
                }
                return entrega;
            });
        
            state.recordDetail.es_modificable = modificable;
        },
        finallyEntregaModificable : ( state ) => {
            state.recordModificabling = false;
        },
        habilitarModoEditar: ( state ) => {
            state.openedRecordModal = false;
            state.openedRecordSaveModal = true;
        },
   }
});

export const {
    startList,
    okList,
    finallyList,
    startNewRecord,
    startRead,
    okRead,
    finallyRead,
    cancelRead,
    startSave,
    okSave,
    finallySave,
    startDelete,
    okDelete,
    finallyDelete,
    closeModal,
    toggleCheckAllEntregas,
    toggleCheckEntrega,
    startAsignarRepartidores,
    okAsignarRepartidores,
    finallyAsignarRepartidores,
    verEntregaDetalle,
    cerrarEntregaDetalle,
    startEntregaModificable,
    okEntregaModificable,
    finallyEntregaModificable,
    habilitarModoEditar
} = despachoSlice.actions;