import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AppLayout } from '@/layouts/AppLayout/AppLayout';
import { AuthLayout } from '@/layouts/AuthLayout/AuthLayout';

import { AuthRoutes } from '@/modules/auth/Auth.routes';

import { AuthGuard } from '@/modules/shared/guards/AuthGuard';

import { ConsultasRoutes } from '@/modules/consultas/consultas.routes';
import { CuadraturaRoutes } from '@/modules/cuadratura/Cuadratura.routes';
import { DashboardRoutes } from '@/modules/dashboard/Dashboard.routes';
import { MantenimientoRoutes } from '@/modules/mantenimiento/Mantenimiento.routes';
import { PrestamosRoutes } from '@/modules/prestamos/Prestamos.routes';
import { RRHHRoutes } from '@/modules/rrhh/RRHH.routes';

export const AppRouter = () => {

  return (
    <BrowserRouter>
      <Routes>

        {/* Ruta pública */}
        <Route element={<AuthLayout />}>
          <Route path="/auth/*" element={<AuthRoutes />} />

          <Route path="/auth" element={<Navigate to="/auth/login" replace />} />
        </Route>

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

          {/* Rutas de RRHH */}
          <Route path="/rrhh/*" element={<RRHHRoutes />} />

          {/* Rutas de Mantenimiento */}
          <Route path="/mantenimiento/*" element={<MantenimientoRoutes />} />


          {/* Rutas de redirección para compatibilidad */}
          <Route path="/cuadratura" element={<Navigate to="/cuadratura/monitor" replace />} />
          <Route path="/consultas" element={<Navigate to="/consultas/monitor-diario" replace />} />
          <Route path="/prestamos" element={<Navigate to="/prestamos/consulta" replace />} />
          <Route path="/rrhh" element={<Navigate to="/rrhh/informe-diferencias" replace />} />
          <Route path="/mantenimiento" element={<Navigate to="/mantenimiento/monedas" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
