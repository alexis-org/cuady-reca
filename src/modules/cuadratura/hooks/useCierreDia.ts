import { useQuery, useMutation } from '@tanstack/react-query';
import { cierreDiaService } from '../services/cierreDiaService';
import { toast } from '@/hooks/use-toast';

export const useCierreDia = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['cierreDia'],
    queryFn: cierreDiaService.obtenerDatosCierre,
  });

  const cerrarDiaMutation = useMutation({
    mutationFn: cierreDiaService.cerrarDia,
    onSuccess: () => {
      toast({
        title: 'Cierre exitoso',
        description: 'El día ha sido cerrado correctamente',
      });
      refetch();
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo cerrar el día',
        variant: 'destructive',
      });
    },
  });

  const imprimirMutation = useMutation({
    mutationFn: cierreDiaService.imprimirReporte,
    onSuccess: () => {
      toast({
        title: 'Impresión iniciada',
        description: 'El reporte se está generando',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo imprimir el reporte',
        variant: 'destructive',
      });
    },
  });

  return {
    data,
    isLoading,
    cerrarDia: cerrarDiaMutation.mutate,
    imprimir: imprimirMutation.mutate,
    isCerrandoDia: cerrarDiaMutation.isPending,
    isImprimiendo: imprimirMutation.isPending,
  };
};
