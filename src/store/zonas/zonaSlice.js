import { createSlice } from "@reduxjs/toolkit";

export const zonaSlice = createSlice({
   name : 'zona',
   initialState : {
        registros: [],
        cargandoRegistros : false,
        seleccionado : null,
        cargandoSeleccionado: false,
        openModal: false,
   },
   reducers : {
        startListar : (state) =>{
            state.cargandoRegistros = true;
            state.registros = [];
        },
        okListar : (state, {payload})=>{
            state.registros = payload;
        },
        finallyListar: ( state ) =>{
            state.cargandoRegistros = false;
        },
        startNuevoRegistro : (state) => {
            state.seleccionado = null;
            state.cargandoSeleccionado = false;
            state.openModal = true;
        },
        startLeer : (state) => {
            state.seleccionado = null ;
            state.cargandoSeleccionado = true;
        },
        okLeer : ( state, { payload }) => {
            state.seleccionado = payload;
            state.openModal = true;
        },
        finallyLeer: ( state ) => {
            state.cargandoSeleccionado = false;
            state.cargandoGuardar = false;
            state.cargandoEliminar = false;
        },
        cancelarSeleccionado: ( state ) => {
            state.seleccionado = null;
            state.cargandoSeleccionado = false;
            state.openModal = false;
        },
        startGuardar: ( state) => {
            state.cargandoGuardar = true;
        },
        okGuardar : ( state, { payload }) => {
            const nuevoRegistro = payload;
            if (!Boolean(state.seleccionado)){
                state.registros.push(nuevoRegistro);
            } else {
                state.registros = state.registros.map(registro=>{
                    if (registro.id === state.seleccionado.id){
                        return nuevoRegistro;
                    }
                    return registro;
                })
            }
            state.openModal = false;
        },
        startEliminar: ( state) => {
            state.cargandoEliminar = true;
        },
        okEliminar : ( state, { payload : id}) => {
            state.registros = state.registros.filter(reg=>{
                return reg.id != id
            });
        },
   }
});

export const {
    startListar,
    okListar,
    finallyListar,
    nuevoRegistro,
    startLeer,
    okLeer,
    finallyLeer,
    startGuardar,
    okGuardar,
    cancelarSeleccionado,
    startNuevoRegistro,
    startEliminar,
    okEliminar,
} = zonaSlice.actions;