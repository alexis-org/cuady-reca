import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from '@/layouts/AuthLayout/AuthLayout';
import { AppLayout } from '@/layouts/AppLayout/AppLayout';
import { AuthGuard } from '@/modules/shared/guards/AuthGuard';
import { NotFound } from '@/modules/shared/pages/NotFound';
import { Login } from '@/modules/auth/pages/Login';
import { SelectFecha } from '@/modules/auth/pages/SelectFecha';
import { DashboardRoutes } from '@/modules/dashboard/Dashboard.routes';
import { useAuth } from '@/modules/auth/hooks/useAuth';

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
          path="/*"
          element={
            <AuthGuard>
              <AppLayout>
                <DashboardRoutes />
              </AppLayout>
            </AuthGuard>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
