import { HeaderComponent } from '@/modules/shared/components/HeaderComponent';

export const NuevaRendicion = () => {
  return (
    <div>
      <HeaderComponent
        title="Ingreso de rendición de Cajero"
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Cuadratura' },
          { label: 'Ingreso de rendición de Cajero' },
        ]}
      />

      <div className="rounded-md border bg-card p-8">
        <p className="text-center text-muted-foreground">
          Vista de Nueva Rendición en construcción
        </p>
      </div>
    </div>
  );
};
