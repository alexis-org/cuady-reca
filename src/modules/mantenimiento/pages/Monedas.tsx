import { HeaderComponent } from '@/modules/shared/components/HeaderComponent';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { MonedaDialog } from '../components/MonedaDialog';
import { useMonedas } from '../hooks/useMonedas';
import { Moneda } from '../interfaces/moneda.interface';

export const Monedas = () => {
  const { monedas, isLoading, createMoneda, updateMoneda, deleteMoneda, isCreating, isUpdating, isDeleting } = useMonedas();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMoneda, setSelectedMoneda] = useState<Moneda | undefined>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [monedaToDelete, setMonedaToDelete] = useState<string | null>(null);

  const handleCreate = () => {
    setSelectedMoneda(undefined);
    setDialogOpen(true);
  };

  const handleEdit = (moneda: Moneda) => {
    setSelectedMoneda(moneda);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setMonedaToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (monedaToDelete) {
      deleteMoneda(monedaToDelete);
      setDeleteDialogOpen(false);
      setMonedaToDelete(null);
    }
  };

  const handleSubmit = (data: any) => {
    if (selectedMoneda) {
      updateMoneda({ ...data, id: selectedMoneda.id });
    } else {
      createMoneda(data);
    }
  };

  return (
    <div>
      <HeaderComponent
        title="Mantenedor de Monedas"
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Mantenimiento' },
          { label: 'Monedas' },
        ]}
        actions={
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Moneda
          </Button>
        }
      />

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Símbolo</TableHead>
              <TableHead>Decimales</TableHead>
              <TableHead className="text-right">Tipo de Cambio</TableHead>
              <TableHead className="w-[100px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  Cargando monedas...
                </TableCell>
              </TableRow>
            ) : monedas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No hay monedas registradas
                </TableCell>
              </TableRow>
            ) : (
              monedas.map((moneda) => (
                <TableRow key={moneda.id}>
                  <TableCell className="font-medium">{moneda.codigo}</TableCell>
                  <TableCell>{moneda.descripcion}</TableCell>
                  <TableCell>{moneda.simbolo}</TableCell>
                  <TableCell>{moneda.decimal}</TableCell>
                  <TableCell className="text-right">
                    {moneda.tipoCambio.toFixed(6)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(moneda)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(moneda.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <MonedaDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        moneda={selectedMoneda}
        isLoading={isCreating || isUpdating}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente la moneda.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} disabled={isDeleting}>
              {isDeleting ? 'Eliminando...' : 'Eliminar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
