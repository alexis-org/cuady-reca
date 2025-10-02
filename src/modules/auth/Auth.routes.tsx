import { Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { SelectFecha } from './pages/SelectFecha';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/select-fecha" element={<SelectFecha />} />
    </Routes>
  );
};
