import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { monedaService } from '../services/monedaService';
import { CreateMonedaDto, UpdateMonedaDto } from '../interfaces/moneda.interface';
import { toast } from '@/hooks/use-toast';

const QUERY_KEY = 'monedas';

export const useMonedas = () => {
  const queryClient = useQueryClient();

  const { data: monedas = [], isLoading } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: monedaService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: monedaService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toast({
        title: 'Moneda creada',
        description: 'La moneda se ha creado correctamente',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo crear la moneda',
        variant: 'destructive',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: monedaService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toast({
        title: 'Moneda actualizada',
        description: 'La moneda se ha actualizado correctamente',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar la moneda',
        variant: 'destructive',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: monedaService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toast({
        title: 'Moneda eliminada',
        description: 'La moneda se ha eliminado correctamente',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo eliminar la moneda',
        variant: 'destructive',
      });
    },
  });

  return {
    monedas,
    isLoading,
    createMoneda: (data: CreateMonedaDto) => createMutation.mutate(data),
    updateMoneda: (data: UpdateMonedaDto) => updateMutation.mutate(data),
    deleteMoneda: (id: string) => deleteMutation.mutate(id),
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
