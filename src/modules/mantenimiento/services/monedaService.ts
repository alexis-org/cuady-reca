import { apiClient } from '@/api';
import { API_ENDPOINTS } from '@/constants';
import { Moneda, CreateMonedaDto, UpdateMonedaDto } from '../interfaces/moneda.interface';

export const monedaService = {
  async getAll(): Promise<Moneda[]> {
    // Simulación de respuesta para desarrollo
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            codigo: '1',
            descripcion: 'Pesos Chilenos',
            simbolo: '$',
            decimal: 'Sí',
            tipoCambio: 1,
            activo: true,
          },
          {
            id: '2',
            codigo: 'USD',
            descripcion: 'Dólar Estadounidense',
            simbolo: '$',
            decimal: 'Sí',
            tipoCambio: 0.85,
            activo: true,
          },
          {
            id: '3',
            codigo: 'EUR',
            descripcion: 'Euro',
            simbolo: '€',
            decimal: 'No',
            tipoCambio: 0.75,
            activo: true,
          },
        ]);
      }, 500);
    });
    // return apiClient.get<Moneda[]>(API_ENDPOINTS.MONEDAS.GET_ALL);
  },

  async create(data: CreateMonedaDto): Promise<Moneda> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Date.now().toString(),
          ...data,
          activo: true,
        });
      }, 500);
    });
    // return apiClient.post<Moneda>(API_ENDPOINTS.MONEDAS.CREATE, data);
  },

  async update(data: UpdateMonedaDto): Promise<Moneda> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...data,
          activo: true,
        } as Moneda);
      }, 500);
    });
    // return apiClient.put<Moneda>(`${API_ENDPOINTS.MONEDAS.UPDATE}/${data.id}`, data);
  },

  async delete(id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
    // return apiClient.delete(`${API_ENDPOINTS.MONEDAS.DELETE}/${id}`);
  },
};
