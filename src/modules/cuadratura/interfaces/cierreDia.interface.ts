export interface CierreDiaItem {
  detalle: string;
  monto: number;
  nivel: number; // 0 = principal, 1 = subitem
}

export interface SeccionCierre {
  titulo: string;
  items: CierreDiaItem[];
  total: number;
}

export interface CierreDiaData {
  estadoCierre: 'Abierto' | 'Cerrado';
  porContabilizar: SeccionCierre;
  contabilizado: SeccionCierre;
}
