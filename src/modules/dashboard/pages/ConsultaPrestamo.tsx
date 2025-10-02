import { HeaderComponent } from '@/modules/shared/components/HeaderComponent';

export const ConsultaPrestamo = () => {
  return (
    <div>
      <HeaderComponent
        title="Consulta Préstamo"
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Préstamos' },
          { label: 'Consulta Préstamo' },
        ]}
      />

      <div className="rounded-md border bg-card p-8">
        <p className="text-center text-muted-foreground">
          Vista de Consulta Préstamo en construcción
        </p>
      </div>
    </div>
  );
};
