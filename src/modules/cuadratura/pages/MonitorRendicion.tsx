import { useState } from 'react';
import { HeaderComponent } from '@/modules/shared/components/HeaderComponent';
import { MonitorRendicionHeader } from '../components/MonitorRendicionHeader';
import { TablaMonitorRendicion } from '../components/TablaMonitorRendicion';
import { CerrarRendicionDialog } from '../components/CerrarRendicionDialog';
import { useMonitorRendicion } from '../hooks/useMonitorRendicion';
import { Badge } from '@/components/ui/badge';

export const MonitorRendicion = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data, isLoading, cerrarRendicion, exportarExcel, imprimir, isCerrandoRendicion } =
    useMonitorRendicion();

  const handleCerrarRendicion = () => {
    cerrarRendicion();
    setDialogOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">Cargando datos...</p>
      </div>
    );
  }

  return (
    <div>
      <HeaderComponent
        title="Monitor de Rendición"
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Cuadratura' },
          { label: 'Monitor de Rendición' },
        ]}
        actions={
          <MonitorRendicionHeader
            onImprimir={() => imprimir()}
            onCerrarRendicion={() => setDialogOpen(true)}
            onExportarExcel={() => exportarExcel()}
          />
        }
      />

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Estado Rendición:</span>
          <Badge variant="default">Abierto</Badge>
        </div>

        {data?.cajeros && <TablaMonitorRendicion cajeros={data.cajeros} />}
      </div>

      <CerrarRendicionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onConfirm={handleCerrarRendicion}
        isLoading={isCerrandoRendicion}
      />
    </div>
  );
};
