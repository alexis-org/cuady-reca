import { HeaderComponent } from '@/modules/shared/components/HeaderComponent';

export const MonitorCuadratura = () => {
  return (
    <div>
      <HeaderComponent
        title="Monitor Cuadratura"
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Cuadratura' },
          { label: 'Monitor Cuadratura' },
        ]}
      />

      <div className="rounded-md border bg-card p-8">
        <p className="text-center text-muted-foreground">
          Vista de Monitor Cuadratura en construcción
        </p>
      </div>
    </div>
  );
};
