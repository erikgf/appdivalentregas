import { createSlice } from "@reduxjs/toolkit";

export const clienteSlice = createSlice({
   name : 'cliente',
   initialState : {
        registros: [],
        cargandoRegistros : false,
        seleccionado : null,
        cargandoSeleccionado: false,
        openModal: false,
        message: null
   },
   reducers : {
        startListar : (state) =>{
            state.cargandoRegistros = true;
            state.registros = [];
        },
        okListar : (state, {payload})=>{
            state.registros = payload;
        },
        errorListar : (state, {payload})=>{
            state.message = {
                text: payload, 
                severity: "error"
            };
        },
        finallyListar: (state) => {
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
        errorLeer : ( state, {payload}) => {
            state.seleccionado = null;
            state.message = {
                text: payload, 
                severity: "error"
            };
        },
        finallyLeer : (state) => {
            state.cargandoSeleccionado = false;
            state.cargandoGuardar = false;
            state.cargandoEliminar = false;
        },
        cancelarSeleccionado: ( state ) => {
            state.seleccionado = null;
            state.cargandoSeleccionado = false;
            state.openModal = false;
        },
        startGuardar: (state) => {
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
            
            state.message = {
                text: 'Registro correcto.',
                severity: 'success'
            };

            state.openModal = false;
        },
        errorGuardar: (state, { payload }) => {
            state.message = {
                text: payload,
                severity: 'error'
            };
        },
        startEliminar: ( state) => {
            state.cargandoEliminar = true;
        },
        okEliminar : ( state, { payload : id }) => {
            state.registros = state.registros.filter(reg=>{
                return reg.id != id
            });

            state.message = {
                text: 'Eliminado correctamente.',
                severity: 'success'
            };
        },
        errorEliminar: (state, { payload }) => {
            state.message = {
                text: payload,
                severity: 'error'
            };
        },
        limpiarMessage: (state) =>{
            state.message = null;
        }
   }
});

export const {
    startListar,
    okListar,
    errorListar,
    finallyListar,
    nuevoRegistro,
    startLeer,
    okLeer,
    errorLeer,
    finallyLeer,
    startGuardar,
    okGuardar,
    errorGuardar,
    cancelarSeleccionado,
    startNuevoRegistro,
    startEliminar,
    okEliminar,
    errorEliminar,
    limpiarMessage
} = clienteSlice.actions;