export interface Moneda {
  id: string;
  codigo: string;
  descripcion: string;
  simbolo: string;
  decimal: number;
  tipoCambio: number;
  activo: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateMonedaDto {
  codigo: string;
  descripcion: string;
  simbolo: string;
  decimal: number;
  tipoCambio: number;
}

export interface UpdateMonedaDto extends Partial<CreateMonedaDto> {
  id: string;
}
