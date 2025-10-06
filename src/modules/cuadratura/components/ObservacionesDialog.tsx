import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ObservacionesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ObservacionesDialog = ({
  open,
  onOpenChange,
}: ObservacionesDialogProps) => {
  const [observaciones, setObservaciones] = useState('');

  const handleGuardar = () => {
    console.log('Observaciones guardadas:', observaciones);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Observaciones del Cierre</DialogTitle>
          <DialogDescription>
            Agregue cualquier observación relevante sobre el cierre del día.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="observaciones">Observaciones</Label>
            <Textarea
              id="observaciones"
              placeholder="Escriba sus observaciones aquí..."
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              className="min-h-[150px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleGuardar}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
