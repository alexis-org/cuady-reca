import { apiClient } from '@/api';
import { API_ENDPOINTS } from '@/constants';
import { Banco, BancoResponse, CreateBancoDto, UpdateBancoDto } from '../interfaces/banco.interface';

export const bancoService = {

  async getAll(params: { page: number; size: number }): Promise<BancoResponse> {
    return apiClient.get<BancoResponse>(API_ENDPOINTS.BANCOS.GET_ALL, { params: { page: params.page, size: params.size } });
  },

  async create(data: CreateBancoDto): Promise<Banco> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          banCodigo: Date.now(),
          ...data,
        });
      }, 500);
    });
    // return apiClient.post<Banco>(API_ENDPOINTS.BANCOS.CREATE, data);
  },

  async update(data: UpdateBancoDto): Promise<Banco> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...data,
          activo: true,
        } as Banco);
      }, 500);
    });
    // return apiClient.put<Banco>(`${API_ENDPOINTS.BANCOS.UPDATE}/${data.id}`, data);
  },

  async delete(id: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
    // return apiClient.delete(`${API_ENDPOINTS.BANCOS.DELETE}/${id}`);
  },
};