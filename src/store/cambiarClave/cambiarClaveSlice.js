import { createSlice } from "@reduxjs/toolkit";

export const cambiarClaveSlice = createSlice({
   name : 'cambiarClave',
   initialState : {
        registro: null,
        cargandoGuardar : false,
   },
   reducers : {
        startGuardar: (state) => {
            state.cargandoGuardar = true;
        },
        okGuardar : ( state ) => {
            state.record = null;
        },
        finallyGuardar : (state) => {
            state.cargandoGuardar = false;
        },
        setRegistro: (state , {payload : record}) =>{
            state.record = record;
        }
   }
});

export const {
    startGuardar,
    okGuardar,
    finallyGuardar,
    setRegistro
} = cambiarClaveSlice.actions;