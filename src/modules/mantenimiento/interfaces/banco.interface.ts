export interface Banco {
  id: string;
  codigo: string;
  descripcion: string;
  activo: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBancoDto {
  codigo: string;
  descripcion: string;
}

export interface UpdateBancoDto extends Partial<CreateBancoDto> {
  id: string;
}