import { createSlice } from "@reduxjs/toolkit";

export const entregasSlice = createSlice({
   name : 'entregas',
   initialState : {
        records: null,
        recordsLoading : false,
        record : null,
        recordLoading: false,
        recordSavingLoading : false,
        recordDeleting : false,
        openedRecordModal : false,
   },
   reducers : {
        startList : (state) =>{
            state.loadingRecords = true;
            state.records = [];
        },
        okList : (state, {payload})=>{
            state.records = payload;
        },
        finallyList : (state) => {
            state.recordsLoading = false;
        },
        startNewRecord : (state) => {
            state.record = null;
            state.recordLoading = false;
            state.openedRecordModal = true;
        },
        startRead : (state) => {
            state.record = null;
            state.recordLoading = true;
        },
        okRead : ( state, { payload : entrega }) => {
            state.record = entrega;
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
            const newRecord = payload;
            if (!Boolean(state.record)){
                state.records.push(newRecord);
            } else {
                state.records = state.records.map( item =>{
                    if (item.id === state.record.id){
                        return newRecord;
                    }
                    return item;
                })
            }
            state.openedRecordModal = false;
        },
        finallySave: ( state ) => {
            state.recordSavingLoading = false;
        },
        startDelete: ( state) => {
            state.recordDeleting = true;
        },
        okDelete : ( state, { payload }) => {
            const id = payload;
            state.records = state.records.filter( record =>{
                return record.id != id
            });
        },
        finallyDelete : ( state ) => {
            state.recordDeleting = false;
        },
        closeModal : (state) => {
            state.openedRecordModal = false;
        }
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
} = entregasSlice.actions;