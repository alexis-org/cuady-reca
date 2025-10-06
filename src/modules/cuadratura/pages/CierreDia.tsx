import { useState } from 'react';
import { HeaderComponent } from '@/modules/shared/components/HeaderComponent';
import { AccionesHeader } from '../components/AccionesHeader';
import { TablaCierre } from '../components/TablaCierre';
import { ObservacionesDialog } from '../components/ObservacionesDialog';
import { useCierreDia } from '../hooks/useCierreDia';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export const CierreDia = () => {
  const [observacionesOpen, setObservacionesOpen] = useState(false);
  const { data, isLoading, cerrarDia, imprimir, isCerrandoDia, isImprimiendo } = useCierreDia();

  const handleCerrar = () => {
    if (window.confirm('¿Está seguro que desea cerrar el día?')) {
      cerrarDia();
    }
  };

  const handleImprimir = () => {
    imprimir();
  };

  const handleObservaciones = () => {
    setObservacionesOpen(true);
  };

  const breadcrumbs = [
    { label: 'Cuadratura', href: '/cuadratura/monitor' },
    { label: 'Cierre Día' },
  ];

  return (
    <div>
      <HeaderComponent
        title="Cierre Día"
        breadcrumbs={breadcrumbs}
        actions={
          <AccionesHeader
            onCerrar={handleCerrar}
            onImprimir={handleImprimir}
            onObservaciones={handleObservaciones}
            isCerrandoDia={isCerrandoDia}
            isImprimiendo={isImprimiendo}
          />
        }
      />

      {/* Estado del Cierre */}
      <div className="flex justify-end mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Estado Cierre:</span>
          <Badge variant={data?.estadoCierre === 'Abierto' ? 'default' : 'secondary'}>
            {data?.estadoCierre || 'Cargando...'}
          </Badge>
        </div>
      </div>

      {/* Paneles de Cierre */}
      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-[600px]" />
          <Skeleton className="h-[600px]" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data?.porContabilizar && <TablaCierre seccion={data.porContabilizar} />}
          {data?.contabilizado && <TablaCierre seccion={data.contabilizado} />}
        </div>
      )}

      {/* Dialog de Observaciones */}
      <ObservacionesDialog
        open={observacionesOpen}
        onOpenChange={setObservacionesOpen}
      />
    </div>
  );
};
