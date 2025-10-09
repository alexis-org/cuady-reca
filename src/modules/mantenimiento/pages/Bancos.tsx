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
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { BancoDialog } from '../components/BancoDialog';
import { useBancos } from '../hooks/useBancos';
import { Banco, CreateBancoDto } from '../interfaces/banco.interface';

export const Bancos = () => {
  const { bancos, isLoading, createBanco, updateBanco, deleteBanco, isCreating, isUpdating, isDeleting } = useBancos();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedBanco, setSelectedBanco] = useState<Banco | undefined>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bancoToDelete, setBancoToDelete] = useState<string | null>(null);

  const handleCreate = () => {
    setSelectedBanco(undefined);
    setDialogOpen(true);
  };

  const handleEdit = (banco: Banco) => {
    setSelectedBanco(banco);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setBancoToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (bancoToDelete) {
      deleteBanco(bancoToDelete);
      setDeleteDialogOpen(false);
      setBancoToDelete(null);
    }
  };

  const handleSubmit = (data: CreateBancoDto) => {
    if (selectedBanco) {
      updateBanco({ ...data, id: selectedBanco.id });
    } else {
      createBanco(data);
    }
  };

  return (
    <div>
      <HeaderComponent
        title="Mantenedor de Bancos"
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Mantenimiento' },
          { label: 'Bancos' },
        ]}
        actions={
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Agregar Banco
          </Button>
        }
      />

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead className="w-[100px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                  Cargando bancos...
                </TableCell>
              </TableRow>
            ) : bancos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                  No hay bancos registrados
                </TableCell>
              </TableRow>
            ) : (
              bancos.map((banco) => (
                <ContextMenu key={banco.id}>
                  <ContextMenuTrigger asChild>
                    <TableRow className="cursor-context-menu">
                      <TableCell className="font-medium">{banco.codigo}</TableCell>
                      <TableCell>{banco.descripcion}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(banco)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(banco.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem onClick={handleCreate}>
                      <Plus className="mr-2 h-4 w-4" />
                      Agregar nuevo banco
                    </ContextMenuItem>
                    <ContextMenuItem onClick={() => handleEdit(banco)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Editar banco
                    </ContextMenuItem>
                    <ContextMenuItem 
                      onClick={() => handleDelete(banco.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Eliminar banco
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <BancoDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        banco={selectedBanco}
        isLoading={isCreating || isUpdating}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro de eliminar banco?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente el banco del sistema.
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