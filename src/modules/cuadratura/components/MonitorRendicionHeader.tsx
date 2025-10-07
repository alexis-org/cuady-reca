import { Button } from '@/components/ui/button';
import { Printer, DollarSign, Monitor, Plus, X, FileSpreadsheet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MonitorRendicionHeaderProps {
  onImprimir: () => void;
  onCerrarRendicion: () => void;
  onExportarExcel: () => void;
}

export const MonitorRendicionHeader = ({
  onImprimir,
  onCerrarRendicion,
  onExportarExcel,
}: MonitorRendicionHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" onClick={onImprimir}>
        <Printer className="h-4 w-4" />
        Imprimir
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate('/cuadratura/depositar-rendicion')}
      >
        <DollarSign className="h-4 w-4" />
        Depositar
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate('/cuadratura/monitor')}
      >
        <Monitor className="h-4 w-4" />
        Monitor de Cuadratura
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate('/cuadratura/nueva-rendicion')}
      >
        <Plus className="h-4 w-4" />
        Nueva Rendición
      </Button>
      <Button variant="outline" size="sm" onClick={onCerrarRendicion}>
        <X className="h-4 w-4" />
        Cerrar Rendición
      </Button>
      <Button variant="outline" size="sm" onClick={onExportarExcel}>
        <FileSpreadsheet className="h-4 w-4" />
        Exportar Excel
      </Button>
    </div>
  );
};
