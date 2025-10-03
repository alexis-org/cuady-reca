import { Routes, Route } from 'react-router-dom';
import { MonitorDiario } from './pages/MonitorDiario';
import { NotFound } from '../shared/pages/NotFound';

export const ConsultasRoutes = () => {
  return (
    <Routes>
      <Route path="/monitor-diario" element={<MonitorDiario />} />
      
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};