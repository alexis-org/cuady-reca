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
import { Moneda } from '../interfaces/moneda.interface';

const monedaSchema = z.object({
  codigo: z.string().min(1, 'Código es requerido').max(10, 'Máximo 10 caracteres'),
  descripcion: z.string().min(1, 'Descripción es requerida').max(100, 'Máximo 100 caracteres'),
  simbolo: z.string().min(1, 'Símbolo es requerido').max(5, 'Máximo 5 caracteres'),
  decimal: z.coerce.number().min(0, 'Mínimo 0').max(10, 'Máximo 10'),
  tipoCambio: z.coerce.number().min(0.000001, 'Debe ser mayor a 0'),
});

type MonedaFormValues = z.infer<typeof monedaSchema>;

interface MonedaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: MonedaFormValues) => void;
  moneda?: Moneda;
  isLoading?: boolean;
}

export const MonedaDialog = ({
  open,
  onOpenChange,
  onSubmit,
  moneda,
  isLoading,
}: MonedaDialogProps) => {
  const form = useForm<MonedaFormValues>({
    resolver: zodResolver(monedaSchema),
    defaultValues: {
      codigo: '',
      descripcion: '',
      simbolo: '',
      decimal: 2,
      tipoCambio: 1.0,
    },
  });

  useEffect(() => {
    if (moneda) {
      form.reset({
        codigo: moneda.codigo,
        descripcion: moneda.descripcion,
        simbolo: moneda.simbolo,
        decimal: moneda.decimal,
        tipoCambio: moneda.tipoCambio,
      });
    } else {
      form.reset({
        codigo: '',
        descripcion: '',
        simbolo: '',
        decimal: 2,
        tipoCambio: 1.0,
      });
    }
  }, [moneda, form]);

  const handleSubmit = (data: MonedaFormValues) => {
    onSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{moneda ? 'Editar Moneda' : 'Nueva Moneda'}</DialogTitle>
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
                    <Input {...field} placeholder="USD" disabled={isLoading} />
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
                    <Input {...field} placeholder="Dólar Estadounidense" disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="simbolo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Símbolo</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="$" disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="decimal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Decimales</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="tipoCambio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Cambio</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" step="0.000001" disabled={isLoading} />
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
