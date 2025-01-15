import { createSlice } from "@reduxjs/toolkit";
import constants from "../../data/constants";

export const clienteSlice = createSlice({
   name : 'cliente',
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
        okListar : (state, {payload : lista})=>{
            state.registros = lista.map( item => { 
                const es_sistema = Boolean(item?.usuario);
                const estado_acceso = es_sistema  
                                        ? item?.usuario.estado_acceso == constants.ESTADO_ACTIVO ? constants.ESTADO_ACTIVO_DESC : constants.ESTADO_INACTIVO_DESC
                                        : '-';
                return {
                    ...item,
                    es_sistema : es_sistema ? constants.ESTADO_SI_DESC : constants.ESTADO_NO_DESC,
                    estado_acceso,
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
                formato_entregas_json: registro?.formato_entregas,
                formato_entregas: Boolean(registro?.formato_entregas) ? JSON.parse(registro?.formato_entregas?.estructura).map((item, index) => ({...item, id: index})) : [],
                es_sistema: Boolean(usuario), 
                username: usuario?.username,
                estado_acceso: usuario?.estado_acceso
            };
            state.openModal = true;
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
        okGuardar : ( state, { payload : nuevoRegistro }) => {
            const es_sistema = Boolean(nuevoRegistro?.usuario);
            const estado_acceso = es_sistema  
                                        ? nuevoRegistro?.usuario.estado_acceso == constants.ESTADO_ACTIVO ? constants.ESTADO_ACTIVO_DESC : constants.ESTADO_INACTIVO_DESC
                                        : '-';

            const nuevoRegistroMod =  {
                ...nuevoRegistro,
                es_sistema: es_sistema ? constants.ESTADO_SI_DESC : constants.ESTADO_NO_DESC,
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
        startEliminar: ( state) => {
            state.cargandoEliminar = true;
        },
        okEliminar : ( state, { payload : id }) => {
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
} = clienteSlice.actions;