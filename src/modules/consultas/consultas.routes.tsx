import { Routes, Route } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import { MonitorDiario } from './pages/MonitorDiario';

export const ConsultasRoutes = () => {
  return (
    <Routes>
      <Route path="/monitor-diario" element={<MonitorDiario />} />
      
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};