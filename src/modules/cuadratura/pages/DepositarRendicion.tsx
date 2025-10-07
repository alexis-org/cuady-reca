import { HeaderComponent } from '@/modules/shared/components/HeaderComponent';

export const DepositarRendicion = () => {
  return (
    <div>
      <HeaderComponent
        title="Depositar Rendición"
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Cuadratura' },
          { label: 'Depositar Rendición' },
        ]}
      />

      <div className="rounded-md border bg-card p-8">
        <p className="text-center text-muted-foreground">
          Vista de Depositar Rendición en construcción
        </p>
      </div>
    </div>
  );
};
