import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { BancoResponse, CreateBancoDto, UpdateBancoDto } from '../interfaces/banco.interface';
import { bancoService } from '../services/bancoService';
import { responseEmpty } from '@/helpers';

const QUERY_KEY = 'bancos';

const response: BancoResponse = responseEmpty;

export const useBancos = (params: { page: number; size: number }) => {
  const queryClient = useQueryClient();

  const { data: bancosRes = response, isLoading } = useQuery({
    queryKey: [QUERY_KEY, params],
    queryFn: () => bancoService.getAll(params),
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
    bancosRes,
    isLoading,
    createBanco: (data: CreateBancoDto) => createMutation.mutate(data),
    updateBanco: (data: UpdateBancoDto) => updateMutation.mutate(data),
    deleteBanco: (id: number) => deleteMutation.mutate(id),
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};