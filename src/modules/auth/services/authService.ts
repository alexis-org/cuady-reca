import { apiClient } from '@/api';
import { API_ENDPOINTS } from '@/constants';
import { AuthResponse, LoginCredentials, Local, FechaContable } from '@/modules/shared/interfaces/auth.interface';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simulación de respuesta para desarrollo
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: '1',
            username: credentials.username,
            email: 'user@example.com',
            fullName: 'Usuario Demo',
            role: 'admin',
          },
          token: 'mock-jwt-token',
          refreshToken: 'mock-refresh-token',
        });
      }, 1000);
    });
    // return apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
  },

  async getLocales(): Promise<Local[]> {
    // Simulación de respuesta para desarrollo
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: '1', codigo: 'LOC001', nombre: 'Local Central', direccion: 'Av. Principal 123' },
          { id: '2', codigo: 'LOC002', nombre: 'Sucursal Norte', direccion: 'Calle Norte 456' },
          { id: '3', codigo: 'LOC003', nombre: 'Sucursal Sur', direccion: 'Calle Sur 789' },
        ]);
      }, 500);
    });
    // return apiClient.get<Local[]>(API_ENDPOINTS.LOCALES.GET_ALL);
  },

  async getFechasContables(localId: string): Promise<FechaContable[]> {
    // Simulación de respuesta para desarrollo
    return new Promise((resolve) => {
      setTimeout(() => {
        const today = new Date().toISOString().split('T')[0];
        resolve([
          { id: '1', fecha: today, localId, estado: 'abierta' },
          { id: '2', fecha: '2025-09-30', localId, estado: 'cerrada' },
          { id: '3', fecha: '2025-09-29', localId, estado: 'cerrada' },
        ]);
      }, 500);
    });
    // return apiClient.get<FechaContable[]>(`${API_ENDPOINTS.FECHAS_CONTABLES.GET_BY_LOCAL}?localId=${localId}`);
  },

  async createFechaContable(localId: string): Promise<FechaContable> {
    const today = new Date().toISOString().split('T')[0];
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Date.now().toString(),
          fecha: today,
          localId,
          estado: 'abierta',
        });
      }, 500);
    });
    // return apiClient.post<FechaContable>(API_ENDPOINTS.FECHAS_CONTABLES.CREATE, { localId });
  },
};
