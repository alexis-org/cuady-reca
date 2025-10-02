import { LoginForm } from '../components/LoginForm';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';

export const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/select-fecha', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (data: { username: string; password: string }) => {
    try {
      setIsLoading(true);
      const response = await authService.login(data);
      login(response.user, response.token, response.refreshToken);
      
      toast({
        title: 'Inicio de sesión exitoso',
        description: `Bienvenido ${response.user.fullName}`,
      });

      navigate('/select-fecha');
    } catch (error: any) {
      toast({
        title: 'Error al iniciar sesión',
        description: error.message || 'Credenciales incorrectas',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Cuadratura y Recaudación</h1>
        <p className="mt-2 text-muted-foreground">Ingrese sus credenciales para continuar</p>
      </div>

      <div className="bg-card border rounded-lg p-8 shadow-sm">
        <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
      </div>
    </div>
  );
};
