import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { Local, FechaContable } from '@/modules/shared/interfaces/auth.interface';
import { STORAGE_KEYS } from '@/constants';
import { useAuth } from '../hooks/useAuth';
import { Calendar, MapPin } from 'lucide-react';

const selectFechaSchema = z.object({
  localId: z.string().min(1, 'Debe seleccionar un local'),
  fechaId: z.string().optional(),
});

type SelectFechaFormValues = z.infer<typeof selectFechaSchema>;

export const SelectFecha = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [locales, setLocales] = useState<Local[]>([]);
  const [fechas, setFechas] = useState<FechaContable[]>([]);
  const [isLoadingLocales, setIsLoadingLocales] = useState(true);
  const [isLoadingFechas, setIsLoadingFechas] = useState(false);
  const [isCreatingFecha, setIsCreatingFecha] = useState(false);

  const form = useForm<SelectFechaFormValues>({
    resolver: zodResolver(selectFechaSchema),
    defaultValues: {
      localId: '',
      fechaId: '',
    },
  });

  const selectedLocalId = form.watch('localId');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }

    const loadLocales = async () => {
      try {
        const data = await authService.getLocales();
        setLocales(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'No se pudieron cargar los locales',
          variant: 'destructive',
        });
      } finally {
        setIsLoadingLocales(false);
      }
    };

    loadLocales();
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (selectedLocalId) {
      loadFechas(selectedLocalId);
    } else {
      setFechas([]);
      form.setValue('fechaId', '');
    }
  }, [selectedLocalId]);

  const loadFechas = async (localId: string) => {
    setIsLoadingFechas(true);
    try {
      const data = await authService.getFechasContables(localId);
      setFechas(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudieron cargar las fechas contables',
        variant: 'destructive',
      });
    } finally {
      setIsLoadingFechas(false);
    }
  };

  const handleNuevaFecha = async () => {
    const localId = form.getValues('localId');
    if (!localId) {
      toast({
        title: 'Error',
        description: 'Debe seleccionar un local primero',
        variant: 'destructive',
      });
      return;
    }

    setIsCreatingFecha(true);
    try {
      const nuevaFecha = await authService.createFechaContable(localId);
      setFechas([nuevaFecha, ...fechas]);
      form.setValue('fechaId', nuevaFecha.id);
      
      toast({
        title: 'Fecha creada',
        description: `Nueva fecha contable: ${nuevaFecha.fecha}`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo crear la fecha contable',
        variant: 'destructive',
      });
    } finally {
      setIsCreatingFecha(false);
    }
  };

  const handleSubmit = (data: SelectFechaFormValues) => {
    if (!data.fechaId) {
      toast({
        title: 'Error',
        description: 'Debe seleccionar una fecha contable',
        variant: 'destructive',
      });
      return;
    }

    const selectedLocal = locales.find(l => l.id === data.localId);
    const selectedFecha = fechas.find(f => f.id === data.fechaId);

    if (selectedLocal && selectedFecha) {
      localStorage.setItem(STORAGE_KEYS.SELECTED_LOCAL, JSON.stringify(selectedLocal));
      localStorage.setItem(STORAGE_KEYS.SELECTED_FECHA, JSON.stringify(selectedFecha));

      toast({
        title: 'Selección exitosa',
        description: `Local: ${selectedLocal.nombre} - Fecha: ${selectedFecha.fecha}`,
      });

      navigate('/');
    }
  };

  const handleCancel = () => {
    navigate('/login');
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Selección de Fecha Contable</h1>
        <p className="mt-2 text-muted-foreground">Configure su contexto de trabajo</p>
      </div>

      <div className="bg-card border rounded-lg p-8 shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="localId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Local</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isLoadingLocales}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <SelectValue placeholder="Seleccione un local" />
                        </div>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {locales.map((local) => (
                        <SelectItem key={local.id} value={local.id}>
                          {local.codigo} - {local.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fechaId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha Contable</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!selectedLocalId || isLoadingFechas}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <SelectValue placeholder="Seleccione una fecha" />
                        </div>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {fechas.map((fecha) => (
                        <SelectItem key={fecha.id} value={fecha.id}>
                          {fecha.fecha} - {fecha.estado}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={handleNuevaFecha}
                disabled={!selectedLocalId || isCreatingFecha}
              >
                Nueva fecha contable
              </Button>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={handleCancel}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={!form.getValues('fechaId')}
              >
                Seleccionar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
