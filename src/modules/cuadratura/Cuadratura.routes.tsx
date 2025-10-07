import { Routes, Route } from 'react-router-dom';
import { MonitorCuadratura } from './pages/MonitorCuadratura';
import { CierreDia } from './pages/CierreDia';
import { MonitorRendicion } from './pages/MonitorRendicion';
import { DepositarRendicion } from './pages/DepositarRendicion';
import { NuevaRendicion } from './pages/NuevaRendicion';
import { NotFound } from '../shared/pages/NotFound';

export const CuadraturaRoutes = () => {
  return (
    <Routes>
      <Route path="/monitor" element={<MonitorCuadratura />} />
      <Route path="/cierre-dia" element={<CierreDia />} />
      <Route path="/monitor-rendicion" element={<MonitorRendicion />} />
      <Route path="/depositar-rendicion" element={<DepositarRendicion />} />
      <Route path="/nueva-rendicion" element={<NuevaRendicion />} />
      
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};