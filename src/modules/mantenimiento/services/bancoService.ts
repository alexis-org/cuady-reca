import { apiClient } from '@/api';
import { API_ENDPOINTS } from '@/constants';
import { Banco, CreateBancoDto, UpdateBancoDto } from '../interfaces/banco.interface';

export const bancoService = {
  async getAll(): Promise<Banco[]> {
    // Simulación de respuesta para desarrollo basada en la imagen proporcionada
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            codigo: '1',
            descripcion: 'BANCO DE CHILE/BANCO EDWARDS',
            activo: true,
          },
          {
            id: '2',
            codigo: '2',
            descripcion: 'CHILE',
            activo: true,
          },
          {
            id: '3',
            codigo: '3',
            descripcion: 'ESTADO',
            activo: true,
          },
          {
            id: '4',
            codigo: '4',
            descripcion: 'SANTIAGO',
            activo: true,
          },
          {
            id: '5',
            codigo: '5',
            descripcion: 'BCI',
            activo: true,
          },
          {
            id: '6',
            codigo: '6',
            descripcion: 'SUDAMERICANO',
            activo: true,
          },
          {
            id: '7',
            codigo: '7',
            descripcion: 'EDWARDS',
            activo: true,
          },
          {
            id: '8',
            codigo: '8',
            descripcion: 'SANTANDER',
            activo: true,
          },
          {
            id: '9',
            codigo: '9',
            descripcion: 'BANCO INTERNACIONAL',
            activo: true,
          },
          {
            id: '10',
            codigo: '10',
            descripcion: 'CITI',
            activo: true,
          },
          {
            id: '11',
            codigo: '11',
            descripcion: 'O HIGGINS',
            activo: true,
          },
          {
            id: '12',
            codigo: '12',
            descripcion: 'BANCO DEL ESTADO DE CHILE',
            activo: true,
          },
          {
            id: '13',
            codigo: '13',
            descripcion: 'DESARROLLO',
            activo: true,
          },
          {
            id: '14',
            codigo: '14',
            descripcion: 'SCOTIABANK CHILE',
            activo: true,
          },
          {
            id: '15',
            codigo: '15',
            descripcion: 'BRASIL',
            activo: true,
          },
          {
            id: '16',
            codigo: '16',
            descripcion: 'BANCO BCI/TBANC/BANCO NOVA',
            activo: true,
          },
          {
            id: '17',
            codigo: '17',
            descripcion: 'BANCO DO BRASIL S.A.',
            activo: true,
          },
          {
            id: '18',
            codigo: '18',
            descripcion: 'BANESTO',
            activo: true,
          },
          {
            id: '19',
            codigo: '19',
            descripcion: 'Internacional',
            activo: true,
          },
          {
            id: '20',
            codigo: '20',
            descripcion: 'BANCO BICE',
            activo: true,
          },
          {
            id: '21',
            codigo: '21',
            descripcion: 'SUDAMERIS',
            activo: true,
          },
          {
            id: '22',
            codigo: '22',
            descripcion: 'CHASE',
            activo: true,
          },
          {
            id: '23',
            codigo: '23',
            descripcion: 'SCOTIABANK',
            activo: true,
          },
          {
            id: '24',
            codigo: '24',
            descripcion: 'FALABELLA',
            activo: true,
          },
          {
            id: '25',
            codigo: '25',
            descripcion: 'TBANC',
            activo: true,
          },
          {
            id: '26',
            codigo: '26',
            descripcion: 'BHIF',
            activo: true,
          },
          {
            id: '27',
            codigo: '27',
            descripcion: 'CORPBANCA',
            activo: true,
          },
          {
            id: '28',
            codigo: '28',
            descripcion: 'BANCO BICE',
            activo: true,
          },
          {
            id: '30',
            codigo: '30',
            descripcion: 'OTROS BANCOS',
            activo: true,
          },
          {
            id: '31',
            codigo: '31',
            descripcion: 'HSBC BANK (CHILE)',
            activo: true,
          },
        ]);
      }, 500);
    });
    // return apiClient.get<Banco[]>(API_ENDPOINTS.BANCOS.GET_ALL);
  },

  async create(data: CreateBancoDto): Promise<Banco> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Date.now().toString(),
          ...data,
          activo: true,
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

  async delete(id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
    // return apiClient.delete(`${API_ENDPOINTS.BANCOS.DELETE}/${id}`);
  },
};