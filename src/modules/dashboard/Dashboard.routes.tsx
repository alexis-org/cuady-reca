import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Monedas } from './pages/Monedas';
import { MonitorCuadratura } from './pages/MonitorCuadratura';
import { MonitorDiario } from './pages/MonitorDiario';
import { ConsultaPrestamo } from './pages/ConsultaPrestamo';
import { InformeDiferencias } from './pages/InformeDiferencias';

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mantenimiento/monedas" element={<Monedas />} />
      <Route path="/cuadratura/monitor" element={<MonitorCuadratura />} />
      <Route path="/consultas/monitor-diario" element={<MonitorDiario />} />
      <Route path="/prestamos/consulta" element={<ConsultaPrestamo />} />
      <Route path="/rrhh/informe-diferencias" element={<InformeDiferencias />} />
    </Routes>
  );
};
