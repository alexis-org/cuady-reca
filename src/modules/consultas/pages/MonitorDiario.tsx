import { HeaderComponent } from '@/modules/shared/components/HeaderComponent';

export const MonitorDiario = () => {
  return (
    <div>
      <HeaderComponent
        title="Monitor Diario"
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Consultas' },
          { label: 'Monitor Diario' },
        ]}
      />

      <div className="rounded-md border bg-card p-8">
        <p className="text-center text-muted-foreground">
          Vista de Monitor Diario en construcción
        </p>
      </div>
    </div>
  );
};
