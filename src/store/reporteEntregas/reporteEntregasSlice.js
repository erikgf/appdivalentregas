import { createSlice } from "@reduxjs/toolkit";

export const reporteEntregasSlice = createSlice({
   name : 'reporteEntregas',
   initialState : {
        records: [],
        recordsLoading : false
   },
   reducers : {
        startList : (state) =>{
            state.recordsLoading = true;
            state.records = [];
        },
        okList : (state, {payload})=>{
            state.records = payload.map(entrega => {
                const entregadoOnTime =(Boolean(entrega?.entregado_on_time) || (entrega?.id_estado != 'E' && Boolean(entrega?.noentregado_on_time)) );
                const statusOnTime = entregadoOnTime ? 'ON TIME' : 'OFF TIME';
                const statusOnTimeColor = entregadoOnTime ? '#2e7d32' : '#ff1a09';
                const statusOnTimeBackgroundColor = entregadoOnTime ? '#a0daa3' : '#f27575';

                return {
                    id: entrega?.id,
                    fechaRegistro : entrega.fecha_en_transito,
                    fechaRecojo : entrega?.fecha_por_entregar ?? "",
                    secuencia : entrega.despacho.secuencia,
                    gavetasCantidad : entrega.numero_gavetas,
                    cajasCantidad : entrega.numero_cajas,
                    paquetesCantidad : 0,
                    guiasCantidad : entrega.numero_guias,
                    destino : entrega?.local?.descripcion ?? "",
                    fechaProgramadaEntrega : entrega?.fecha_estimada_entrega,
                    fechaEntrega :  entrega?.fecha_entregado ?? "",
                    status : entrega?.estado?.nombre,
                    statusColor: entrega?.estado?.hex_color,
                    statusOnTime,
                    statusOnTimeColor,
                    statusOnTimeBackgroundColor
                }
            });
        },
        finallyList : (state) => {
            state.recordsLoading = false;
        },
   }
});

export const {
    startList,
    okList,
    finallyList,
} = reporteEntregasSlice.actions;