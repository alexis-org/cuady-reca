import { MonitorRendicionData, CajeroRendicion } from '../interfaces/monitorRendicion.interface';

// Servicio mock - reemplazar con llamadas API reales
export const monitorRendicionService = {
  getData: async (): Promise<MonitorRendicionData> => {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      cajeros: [
        {
          id: '1',
          codigoCajero: '0000002222',
          nombreCajero: 'Cajero 2222',
          estadoRendicion: 'CERRADO',
          retiroIRS: 380000,
          rendicion: 444625,
          diferenciaCaja: 0,
        },
        {
          id: '2',
          codigoCajero: '0000001111',
          nombreCajero: 'Cajero 1111',
          estadoRendicion: 'CERRADO',
          retiroIRS: 400000,
          rendicion: 981648,
          diferenciaCaja: 0,
        },
        {
          id: '3',
          codigoCajero: '0000003333',
          nombreCajero: 'Supervisor 3333',
          estadoRendicion: 'CERRADO',
          retiroIRS: 220000,
          rendicion: 641800,
          diferenciaCaja: 0,
        },
        {
          id: '4',
          codigoCajero: '0000000514',
          nombreCajero: 'Cajero 514',
          estadoRendicion: 'ABIERTO',
          retiroIRS: 0,
          rendicion: 0,
          diferenciaCaja: 0,
        },
      ],
      fechaContable: '2024-01-15',
      local: 'Local Principal',
    };
  },

  cerrarRendicion: async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return;
  },

  exportarExcel: async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return;
  },

  imprimir: async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return;
  },
};
