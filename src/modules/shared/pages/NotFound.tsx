import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-3xl font-semibold">Página no encontrada</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <Button onClick={() => navigate('/')} className="mt-8">
          <Home className="mr-2 h-4 w-4" />
          Volver al inicio
        </Button>
      </div>
    </div>
  );
};
