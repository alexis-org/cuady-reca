import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from '@/layouts/AuthLayout/AuthLayout';
import { AppLayout } from '@/layouts/AppLayout/AppLayout';
import { AuthGuard } from '@/modules/shared/guards/AuthGuard';
import { Login } from '@/modules/auth/pages/Login';
import { SelectFecha } from '@/modules/auth/pages/SelectFecha';
import { DashboardRoutes } from '@/modules/dashboard/Dashboard.routes';
import { useAuth } from '@/modules/auth/hooks/useAuth';

import { CuadraturaRoutes } from '@/modules/cuadratura/Cuadratura.routes';
import { ConsultasRoutes } from '@/modules/consultas/consultas.routes';
import { PrestamosRoutes } from '@/modules/prestamos/Prestamos.routes';

export const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/select-fecha" replace />
            ) : (
              <AuthLayout>
                <Login />
              </AuthLayout>
            )
          }
        />
        <Route
          path="/select-fecha"
          element={
            <AuthGuard>
              <AuthLayout>
                <SelectFecha />
              </AuthLayout>
            </AuthGuard>
          }
        />

        {/* Protected Routes */}
        <Route
          element={
            <AuthGuard>
              <AppLayout />
            </AuthGuard>
          }
        >
          {/* Rutas de Dashboard */}
          <Route path="/*" element={<DashboardRoutes />} />

          {/* Rutas de Cuadratura */}
          <Route path="/cuadratura/*" element={<CuadraturaRoutes />} />

          {/* Rutas de Consultas */}
          <Route path="/consultas/*" element={<ConsultasRoutes />} />

          {/* Rutas de Prestamos */}
          <Route path="/prestamos/*" element={<PrestamosRoutes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
