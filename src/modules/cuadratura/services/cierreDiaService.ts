import { CierreDiaData } from '../interfaces/cierreDia.interface';

// Servicio mock - reemplazar con API real
export const cierreDiaService = {
  obtenerDatosCierre: async (): Promise<CierreDiaData> => {
    // Simulación de delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      estadoCierre: 'Abierto',
      porContabilizar: {
        titulo: 'POR CONTABILIZAR',
        items: [
          { detalle: 'Venta Pos', monto: 215739, nivel: 0 },
          { detalle: 'Efectivo', monto: 109540, nivel: 1 },
          { detalle: 'Transbank', monto: 61230, nivel: 1 },
          { detalle: 'Transbank Offline', monto: 14990, nivel: 1 },
          { detalle: 'Diferencia por Cambio', monto: 1, nivel: 1 },
          { detalle: 'Redondeo', monto: -2, nivel: 1 },
          { detalle: 'Tarjetas Alimentación', monto: 29980, nivel: 1 },
          { detalle: 'Levantamiento Documentos en Cartera', monto: 0, nivel: 0 },
          { detalle: 'Otros documentos no contables', monto: 0, nivel: 0 },
          { detalle: 'Prestamos', monto: 5000, nivel: 0 },
          { detalle: 'Recaudacion', monto: 0, nivel: 0 },
        ],
        total: 220739,
      },
      contabilizado: {
        titulo: 'CONTABILIZADO',
        items: [
          { detalle: 'Depósito Recaudación', monto: 0, nivel: 0 },
          { detalle: 'Depósito Cheques', monto: 0, nivel: 0 },
          { detalle: 'Depósito Vale Vistas', monto: 0, nivel: 0 },
          { detalle: 'Otros Medios de Pago', monto: 89939, nivel: 0 },
          { detalle: 'Transbank', monto: 44970, nivel: 1 },
          { detalle: 'Transbank Offline', monto: 14990, nivel: 1 },
          { detalle: 'Diferencia por Cambio', monto: 1, nivel: 1 },
          { detalle: 'Redondeo', monto: -2, nivel: 1 },
          { detalle: 'Tarjetas Alimentación', monto: 29980, nivel: 1 },
          { detalle: 'Otros documentos no contables', monto: 0, nivel: 0 },
          { detalle: 'Documento en Cartera', monto: 0, nivel: 0 },
          { detalle: 'Modificación MP Documento en Cartera', monto: 0, nivel: 0 },
          { detalle: 'Diferencia Caja (A favor)', monto: -0, nivel: 0 },
          { detalle: 'Dif. Real', monto: -0, nivel: 1 },
          { detalle: 'Dif. documentaria', monto: -0, nivel: 1 },
        ],
        total: 89939,
      },
    };
  },

  cerrarDia: async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Día cerrado exitosamente');
  },

  imprimirReporte: async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Reporte impreso');
  },
};
