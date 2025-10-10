import { Response } from "@/modules/shared/interfaces";

export interface BancoResponse extends Response {
  content:          Banco[];
}

export interface Banco {
  banCodigo:      number;
  banDescripcion: string;
}

export interface CreateBancoDto {
  banCodigo:      number;
  banDescripcion: string;
}

export interface UpdateBancoDto extends Partial<CreateBancoDto> {
  banCodigo: number;
}