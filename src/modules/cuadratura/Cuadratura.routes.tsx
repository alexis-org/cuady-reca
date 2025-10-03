import { Routes, Route } from 'react-router-dom';
import { MonitorCuadratura } from './pages/MonitorCuadratura';
import { NotFound } from '../shared/pages/NotFound';

export const CuadraturaRoutes = () => {
  return (
    <Routes>
      <Route path="/monitor" element={<MonitorCuadratura />} />
      
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};