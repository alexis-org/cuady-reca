export interface CajeroRendicion {
  id: string;
  codigoCajero: string;
  nombreCajero: string;
  estadoRendicion: 'ABIERTO' | 'CERRADO';
  retiroIRS: number;
  rendicion: number;
  diferenciaCaja: number;
}

export interface MonitorRendicionData {
  cajeros: CajeroRendicion[];
  fechaContable: string;
  local: string;
}
