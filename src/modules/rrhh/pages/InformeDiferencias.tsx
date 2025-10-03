import { HeaderComponent } from '@/modules/shared/components/HeaderComponent';

export const InformeDiferencias = () => {
  return (
    <div>
      <HeaderComponent
        title="Informe Diferencias Cajeros"
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'RRHH' },
          { label: 'Informe Diferencias' },
        ]}
      />

      <div className="rounded-md border bg-card p-8">
        <p className="text-center text-muted-foreground">
          Vista de Informe Diferencias en construcción
        </p>
      </div>
    </div>
  );
};
