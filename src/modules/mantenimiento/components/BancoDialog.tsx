import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useEffect } from 'react';
import { Banco } from '../interfaces/banco.interface';

const bancoSchema = z.object({
  codigo: z.string().min(1, 'Código es requerido').max(10, 'Máximo 10 caracteres'),
  descripcion: z.string().min(1, 'Descripción es requerida').max(100, 'Máximo 100 caracteres'),
});

type BancoFormValues = z.infer<typeof bancoSchema>;

interface BancoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: BancoFormValues) => void;
  banco?: Banco;
  isLoading?: boolean;
}

export const BancoDialog = ({
  open,
  onOpenChange,
  onSubmit,
  banco,
  isLoading,
}: BancoDialogProps) => {
  const form = useForm<BancoFormValues>({
    resolver: zodResolver(bancoSchema),
    defaultValues: {
      codigo: '',
      descripcion: '',
    },
  });

  useEffect(() => {
    if (banco) {
      form.reset({
        codigo: banco.codigo,
        descripcion: banco.descripcion,
      });
    } else {
      form.reset({
        codigo: '',
        descripcion: '',
      });
    }
  }, [banco, form]);

  const handleSubmit = (data: BancoFormValues) => {
    onSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{banco ? 'Editar Banco' : 'Nuevo Banco'}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="codigo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="001" disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nombre del banco" disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Guardando...' : 'Guardar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};