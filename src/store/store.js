import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { localSlice } from "./locales/localSlice";
import { zonaSlice } from "./zonas/zonaSlice";
import { clienteSlice } from "./clientes/clienteSlice";
import { despachoSlice } from "./despachos/despachoSlice";
import { repartidorSlice } from "./repartidores/repartidorSlice";
import { colaboradorSlice } from "./colaboradores/colaboradorSlice";
import { entregasSlice } from "./entregas/entregasSlice";
import { entregasRepartidorSlice } from "./entregasRepartidor/entregasRepartidorSlice";
import { uiSlice } from "./ui/uiSlice";
import { reporteEntregasSlice } from "./reporteEntregas/reporteEntregasSlice";
import { cambiarClaveSlice } from "./cambiarClave/cambiarClaveSlice";

export const store = configureStore({
    reducer : {
        ui: uiSlice.reducer,
        auth: authSlice.reducer,
        cambiarClave: cambiarClaveSlice.reducer,
        local: localSlice.reducer,
        zona: zonaSlice.reducer,
        cliente: clienteSlice.reducer,
        despacho: despachoSlice.reducer,
        repartidor: repartidorSlice.reducer,
        colaborador: colaboradorSlice.reducer,
        entregas:  entregasSlice.reducer,
        entregasRepartidor: entregasRepartidorSlice.reducer,
        reporteEntregas: reporteEntregasSlice.reducer
    }
});