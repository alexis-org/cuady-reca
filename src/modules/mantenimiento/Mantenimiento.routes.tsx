import { Routes, Route } from 'react-router-dom';
import { NotFound } from '../shared/pages/NotFound';
import { Monedas } from './pages/Monedas';
import { Bancos } from './pages/Bancos';

export const MantenimientoRoutes = () => {
  return (
    <Routes>
      <Route path="/monedas" element={<Monedas />} />
      <Route path="/bancos" element={<Bancos />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
