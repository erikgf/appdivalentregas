import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from './components';
import './App.css';
import { useUI } from './hooks/useUI';
import useNotification from './hooks/useNotification';
import { Clientes, Locales, Login, Repartidores, Colaboradores, Zonas, GestionarDespachos, 
          ConsultarEntregasCliente, ConsultarEntregasClienteResumen, GestionarEntregasRepartidor, 
          ReporteEntregas} from './pages';

function App() {
  const {  mensaje, onLimpiarMensaje } = useUI();
  const notificar = useNotification();

  useEffect(()=>{
      if (!Boolean(mensaje)) return;
      notificar(mensaje);
      return () => {
        onLimpiarMensaje();
      }
  }, [mensaje]);

  return   <Routes>
              {/* Public */}
              <Route path="/" element={<Login />} />
              {/* Private */}
              <Route element = {<RequireAuth/>}>
                <Route path="/zonas" element={<Zonas />} />
                <Route path="/locales" element={<Locales />} />
                <Route path="/clientes" element={<Clientes />} />
                <Route path="/repartidores" element={<Repartidores />} />
                <Route path="/colaboradores" element={<Colaboradores />} />
                <Route path="/gestionar-despachos" element={<GestionarDespachos />} />
                <Route path="/reporte-entregas" element={<ReporteEntregas />} />
                {/*<Route path="/consultar-entregas" element={<ConsultarEntregas />} /> */}
                <Route path="/consultar-entregas-cliente" element={<ConsultarEntregasCliente/>} />
                <Route path="/consultar-entregas-cliente-resumen" element={<ConsultarEntregasClienteResumen />} />
                <Route path="/consultar-entregas-repartidor" element={<GestionarEntregasRepartidor />} />
              </Route>
              { /* Catch all */}
              <Route path="*" element={<Login />} />
            </Routes>
}

export default App
