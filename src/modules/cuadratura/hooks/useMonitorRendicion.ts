import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { monitorRendicionService } from '../services/monitorRendicionService';
import { useToast } from '@/hooks/use-toast';

export const useMonitorRendicion = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['monitor-rendicion'],
    queryFn: monitorRendicionService.getData,
  });

  const cerrarRendicionMutation = useMutation({
    mutationFn: monitorRendicionService.cerrarRendicion,
    onSuccess: () => {
      toast({
        title: 'Rendición cerrada',
        description: 'El proceso de rendición ha sido cerrado exitosamente',
      });
      queryClient.invalidateQueries({ queryKey: ['monitor-rendicion'] });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo cerrar la rendición',
        variant: 'destructive',
      });
    },
  });

  const exportarExcelMutation = useMutation({
    mutationFn: monitorRendicionService.exportarExcel,
    onSuccess: () => {
      toast({
        title: 'Excel exportado',
        description: 'El archivo Excel ha sido generado exitosamente',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo exportar el archivo Excel',
        variant: 'destructive',
      });
    },
  });

  const imprimirMutation = useMutation({
    mutationFn: monitorRendicionService.imprimir,
    onSuccess: () => {
      toast({
        title: 'Impresión iniciada',
        description: 'El documento se está enviando a imprimir',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo imprimir el documento',
        variant: 'destructive',
      });
    },
  });

  return {
    data,
    isLoading,
    error,
    cerrarRendicion: cerrarRendicionMutation.mutate,
    exportarExcel: exportarExcelMutation.mutate,
    imprimir: imprimirMutation.mutate,
    isCerrandoRendicion: cerrarRendicionMutation.isPending,
  };
};
