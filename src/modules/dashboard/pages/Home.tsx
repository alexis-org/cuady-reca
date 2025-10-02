import { HeaderComponent } from '@/modules/shared/components/HeaderComponent';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Users, TrendingUp, DollarSign } from 'lucide-react';

export const Home = () => {
  const stats = [
    {
      title: 'Cuadraturas Hoy',
      value: '12',
      description: 'Pendientes de revisión',
      icon: BarChart3,
    },
    {
      title: 'Cajeros Activos',
      value: '8',
      description: 'En turno actual',
      icon: Users,
    },
    {
      title: 'Recaudación',
      value: '$45,231',
      description: '+12% desde ayer',
      icon: TrendingUp,
    },
    {
      title: 'Diferencias',
      value: '$0',
      description: 'Sin diferencias detectadas',
      icon: DollarSign,
    },
  ];

  return (
    <div>
      <HeaderComponent
        title="Dashboard"
        breadcrumbs={[{ label: 'Inicio' }]}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Resumen de Actividad</CardTitle>
            <CardDescription>Últimas operaciones del día</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Sistema de cuadratura y recaudación funcionando correctamente.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alertas</CardTitle>
            <CardDescription>Notificaciones importantes</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No hay alertas pendientes en este momento.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
