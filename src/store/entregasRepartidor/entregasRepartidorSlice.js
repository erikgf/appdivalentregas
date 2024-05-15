import { createSlice } from "@reduxjs/toolkit";

export const entregasRepartidorSlice = createSlice({
   name : 'entregasRepartidor',
   initialState : {
        records: null,
        recordsLoading : false,
        record : null,
        recordLoading: false,
        recordSavingLoading : false,
        openedRecordModal : false,
        openedRecordSaveModal: false
   },
   reducers : {
        startList : (state) =>{
            state.recordsLoading = true;
            state.records = [];
        },
        okList : (state, {payload})=>{
            state.records = payload.map( item => {
                return {
                    ...item,
                    images : JSON.parse(item?.cadena_fotos)
                }
            });
        },
        finallyList : (state) => {
            state.recordsLoading = false;
        },
        cancelRead: ( state ) => {
            state.record = null;
            state.recordLoading = false;
        },
        startSave: ( state) => {
            state.recordSavingLoading = true;
        },
        okSave : ( state, { payload : nuevoRegistro }) => {
            state.records = state.records.map( item =>{
                if (item.id === state.record.id){
                    return {
                        ...item,
                        ...nuevoRegistro,
                        images : JSON.parse(nuevoRegistro?.cadena_fotos)
                    };
                }
                return item;
            });
            state.openedRecordSaveModal = false;
        },
        finallySave: ( state ) => {
            state.recordSavingLoading = false;
        },
        closeModalSave : (state) => {
            state.openedRecordSaveModal = false;
        },
        seleccionarEntrega : ( state, { payload: {id, isEditar = false}}) => {
            state.record = state.records.find( item => item.id == id);

            if (isEditar === true){
                state.openedRecordSaveModal = true;
                state.openedRecordModal = false;
            } else {
                if (state.record.id_estado === "E"){
                    state.openedRecordModal = true;
                } else {
                    state.openedRecordSaveModal = true;
                }
            }
        },
        closeModal : (state) => {
            state.openedRecordModal = false;
        },
   }
});

export const {
    startList,
    okList,
    finallyList,
    startRead,
    okRead,
    finallyRead,
    cancelRead,
    startSave,
    okSave,
    finallySave,
    closeModal,
    closeModalSave,
    seleccionarEntrega
} = entregasRepartidorSlice.actions;