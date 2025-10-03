import { Routes, Route } from 'react-router-dom';
import { InformeDiferencias } from './pages/InformeDiferencias';
import { NotFound } from '../shared/pages/NotFound';

export const RRHHRoutes = () => {
  return (
    <Routes>
      <Route path="/informe-diferencias" element={<InformeDiferencias />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
