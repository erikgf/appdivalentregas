import { createSlice } from "@reduxjs/toolkit";

export const repartidorSlice = createSlice({
   name : 'repartidor',
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
        okListar : (state, {payload: lista})=>{
            state.registros = lista.map( item => { 
                const es_sistema = Boolean(item?.usuario);
                const estado_acceso = es_sistema  
                                        ? item?.usuario.estado_acceso == 'A' ? 'ACTIVO' : 'INACTIVO'
                                        : '-';
                const zonas_descripcion = item?.zonas.map( zona => zona.descripcion ).join(",");

                return {
                    ...item,
                    es_sistema : es_sistema ? "SÍ" : "NO",
                    estado_acceso,
                    zonas_descripcion
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
                es_sistema: Boolean(usuario), 
                username: usuario?.username,
                estado_acceso: usuario?.estado_acceso
            };
            state.openModal = true;
        },
        finallyLeer : (state) => {
            state.cargandoRegistros = false;
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
        okGuardar : ( state, { payload : nuevoRegistro}) => {
            const es_sistema = Boolean(nuevoRegistro?.usuario);
            const estado_acceso = es_sistema  
                                        ? nuevoRegistro?.usuario.estado_acceso == 'A' ? 'ACTIVO' : 'INACTIVO'
                                        : '-';

            const nuevoRegistroMod =  {
                ...nuevoRegistro,
                zonas_descripcion: nuevoRegistro?.zonas.map( zona => zona.descripcion ).join(","),
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
        startEliminar: ( state) => {
            state.cargandoEliminar = true;
        },
        okEliminar : ( state, { payload : id }) => {
            state.registros = state.registros.filter(reg=>{
                return reg.id != id
            });
        }
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
} = repartidorSlice.actions;