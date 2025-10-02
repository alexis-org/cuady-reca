import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { getInitials } from '@/helpers';
import { User, MapPin, Calendar, LogOut, Menu } from 'lucide-react';
import { STORAGE_KEYS } from '@/constants';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  onToggleSidebar: () => void;
}

export const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const selectedLocal = JSON.parse(localStorage.getItem(STORAGE_KEYS.SELECTED_LOCAL) || '{}');
  const selectedFecha = JSON.parse(localStorage.getItem(STORAGE_KEYS.SELECTED_FECHA) || '{}');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">CR</span>
          </div>
          <h1 className="text-xl font-semibold hidden sm:block">Cuadratura y Recaudación</h1>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
            {selectedLocal.nombre && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{selectedLocal.nombre}</span>
              </div>
            )}
            {selectedFecha.fecha && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{selectedFecha.fecha}</span>
              </div>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user ? getInitials(user.fullName) : 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user?.fullName}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/select-fecha')}>
                <MapPin className="mr-2 h-4 w-4" />
                Cambiar Local/Fecha
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-xs text-muted-foreground">
                Versión 1.0.0
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
