import { Routes, Route } from 'react-router-dom';
import { NotFound } from '../shared/pages/NotFound';
import { Monedas } from './pages/Monedas';

export const MantenimientoRoutes = () => {
  return (
    <Routes>
      <Route path="/monedas" element={<Monedas />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
