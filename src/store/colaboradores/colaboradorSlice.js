import { createSlice } from "@reduxjs/toolkit";

export const colaboradorSlice = createSlice({
   name : 'colaborador',
   initialState : {
        registros: [],
        cargandoRegistros : false,
        cargandoSeleccionado: false,
        cargandoGuardar: false,
        cargandoEliminar: false,
        seleccionado : null,
        openModal: false,
   },
   reducers : {
        startListar : (state) =>{
            state.cargandoRegistros = true;
            state.registros = [];
        },
        okListar : (state, {payload : lista})=>{
            state.registros = lista.map( item => {
                const es_sistema = Boolean(item?.usuario);
                const estado_acceso = es_sistema  
                                        ? item?.usuario.estado_acceso == 'A' ? 'ACTIVO' : 'INACTIVO'
                                        : '-';
                return {
                    ...item,
                    es_sistema : es_sistema ? "SÍ" : "NO",
                    estado_acceso
                }
            });
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
        okLeer : ( state, { payload : registro }) => {
            const usuario = registro?.usuario;
            state.seleccionado =  {
                ...registro, 
                username: usuario?.username,
                es_sistema: Boolean(usuario), 
                estado_acceso: usuario?.estado_acceso
            };
            state.openModal = true;
        },
        finallyLeer : (state) => {
            state.cargandoSeleccionado = false;
        },
        cancelarSeleccionado: ( state ) => {
            state.seleccionado = null;
            state.cargandoSeleccionado = false;
            state.openModal = false;
        },
        startGuardar: ( state) => {
            state.cargandoGuardar = true;
        },
        okGuardar : ( state, { payload : nuevoRegistro }) => {
            const es_sistema = Boolean(nuevoRegistro?.usuario);
            const estado_acceso = es_sistema  
                                        ? nuevoRegistro?.usuario.estado_acceso == 'A' ? 'ACTIVO' : 'INACTIVO'
                                        : '-';


            const nuevoRegistroMod =  {
                ...nuevoRegistro, 
                es_sistema: es_sistema ? "SÍ" : "NO",
                estado_acceso
            };

            if (!Boolean(state.seleccionado)){
                state.registros.push(nuevoRegistroMod);
            } else {
                state.registros = state.registros.map(registro=>{
                    if (registro.id === state.seleccionado.id){
                        return nuevoRegistroMod;
                    }
                    return registro;
                })
            }

            state.openModal = false;
        },
        finallyGuardar: ( state ) => {
            state.cargandoGuardar = false;
        },
        startEliminar: ( state) => {
            state.cargandoEliminar = true;
        },
        okEliminar : ( state, { payload : id }) => {
            state.registros = state.registros.filter(reg=>{
                return reg.id != id
            });
        },
        finallyEliminar : ( state ) => {
            state.cargandoEliminar = false;
        }
   }
});

export const {
    startListar,
    okListar,
    finallyListar,
    startNuevoRegistro,
    startLeer,
    okLeer,
    finallyLeer,
    cancelarSeleccionado,
    startGuardar,
    okGuardar,
    finallyGuardar,
    startEliminar,
    okEliminar,
    finallyEliminar,
} = colaboradorSlice.actions;