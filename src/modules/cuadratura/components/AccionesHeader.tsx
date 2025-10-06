import { Button } from '@/components/ui/button';
import { FileText, Printer, MessageSquare } from 'lucide-react';

interface AccionesHeaderProps {
  onCerrar: () => void;
  onImprimir: () => void;
  onObservaciones: () => void;
  isCerrandoDia: boolean;
  isImprimiendo: boolean;
}

export const AccionesHeader = ({
  onCerrar,
  onImprimir,
  onObservaciones,
  isCerrandoDia,
  isImprimiendo,
}: AccionesHeaderProps) => {
  return (
    <div className="flex gap-2">
      <Button
        onClick={onCerrar}
        disabled={isCerrandoDia}
        variant="default"
      >
        <FileText className="h-4 w-4" />
        Cerrar
      </Button>
      <Button
        onClick={onImprimir}
        disabled={isImprimiendo}
        variant="outline"
      >
        <Printer className="h-4 w-4" />
        Imprimir
      </Button>
      <Button
        onClick={onObservaciones}
        variant="outline"
      >
        <MessageSquare className="h-4 w-4" />
        Observaciones
      </Button>
    </div>
  );
};
