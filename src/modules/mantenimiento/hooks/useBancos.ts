import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { CreateBancoDto, UpdateBancoDto } from '../interfaces/banco.interface';
import { bancoService } from '../services/bancoService';

const QUERY_KEY = 'bancos';

export const useBancos = () => {
  const queryClient = useQueryClient();

  const { data: bancos = [], isLoading } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: bancoService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: bancoService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toast({
        title: 'Banco creado',
        description: 'El banco se ha creado correctamente',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo crear el banco',
        variant: 'destructive',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: bancoService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toast({
        title: 'Banco actualizado',
        description: 'El banco se ha actualizado correctamente',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar el banco',
        variant: 'destructive',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: bancoService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toast({
        title: 'Banco eliminado',
        description: 'El banco se ha eliminado correctamente',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo eliminar el banco',
        variant: 'destructive',
      });
    },
  });

  return {
    bancos,
    isLoading,
    createBanco: (data: CreateBancoDto) => createMutation.mutate(data),
    updateBanco: (data: UpdateBancoDto) => updateMutation.mutate(data),
    deleteBanco: (id: string) => deleteMutation.mutate(id),
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};