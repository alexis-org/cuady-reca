import { Routes, Route } from 'react-router-dom';
import { ConsultaPrestamo } from './pages/ConsultaPrestamo';
import { NotFound } from '../shared/pages/NotFound';

export const PrestamosRoutes = () => {
  return (
    <Routes>
      <Route path="/consulta" element={<ConsultaPrestamo />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
