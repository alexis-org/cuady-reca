import { Routes, Route } from 'react-router-dom';
import { MonitorCuadratura } from './pages/MonitorCuadratura';
import { CierreDia } from './pages/CierreDia';
import { NotFound } from '../shared/pages/NotFound';

export const CuadraturaRoutes = () => {
  return (
    <Routes>
      <Route path="/monitor" element={<MonitorCuadratura />} />
      <Route path="/cierre-dia" element={<CierreDia />} />
      
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};