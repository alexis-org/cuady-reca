import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Monedas } from './pages/Monedas';
import { ConsultaPrestamo } from './pages/ConsultaPrestamo';
import { InformeDiferencias } from './pages/InformeDiferencias';
import NotFound from '@/pages/NotFound';

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mantenimiento/monedas" element={<Monedas />} />
      <Route path="/prestamos/consulta" element={<ConsultaPrestamo />} />
      <Route path="/rrhh/informe-diferencias" element={<InformeDiferencias />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
