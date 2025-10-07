import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Home,
  Coins,
  FileText,
  Search,
  CreditCard,
  Users,
  ChevronDown,
  ChevronRight,
  Settings,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path?: string;
  children?: NavItem[];
}

const navigationItems: NavItem[] = [
  {
    label: 'Inicio',
    icon: <Home className="h-5 w-5" />,
    path: '/',
  },
  {
    label: 'Cuadratura',
    icon: <FileText className="h-5 w-5" />,
    children: [
      {
        label: 'Monitor Cuadratura',
        icon: <FileText className="h-4 w-4" />,
        path: '/cuadratura/monitor',
      },
      {
        label: 'Cierre Día',
        icon: <FileText className="h-4 w-4" />,
        path: '/cuadratura/cierre-dia',
      },
      {
        label: 'Monitor de Rendición',
        icon: <FileText className="h-4 w-4" />,
        path: '/cuadratura/monitor-rendicion',
      },
    ],
  },
  {
    label: 'Consultas',
    icon: <Search className="h-5 w-5" />,
    children: [
      {
        label: 'Monitor Diario',
        icon: <Search className="h-4 w-4" />,
        path: '/consultas/monitor-diario',
      },
    ],
  },
  {
    label: 'Préstamos',
    icon: <CreditCard className="h-5 w-5" />,
    children: [
      {
        label: 'Consulta Préstamo',
        icon: <CreditCard className="h-4 w-4" />,
        path: '/prestamos/consulta',
      },
    ],
  },
  {
    label: 'RRHH',
    icon: <Users className="h-5 w-5" />,
    children: [
      {
        label: 'Informe Diferencias',
        icon: <Users className="h-4 w-4" />,
        path: '/rrhh/informe-diferencias',
      },
    ],
  },
  {
    label: 'Mantenimiento',
    icon: <Settings className="h-5 w-5" />,
    children: [
      {
        label: 'Monedas',
        icon: <Coins className="h-4 w-4" />,
        path: '/mantenimiento/monedas',
      },
    ],
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>(['']);

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev =>
      prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]
    );
  };

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const isExpanded = expandedItems.includes(item.label);
    const hasChildren = item.children && item.children.length > 0;

    if (hasChildren) {
      return (
        <div key={item.label}>
          <Button
            variant="ghost"
            className={cn(
              'w-full justify-start gap-3 font-normal',
              level === 0 ? 'text-sidebar-foreground' : 'text-sidebar-foreground/80 text-sm'
            )}
            onClick={() => toggleExpanded(item.label)}
          >
            {item.icon}
            <span className="flex-1 text-left">{item.label}</span>
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
          {isExpanded && (
            <div className="ml-4 mt-1 space-y-1">
              {item.children?.map(child => renderNavItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <NavLink
        key={item.path}
        to={item.path!}
        onClick={onClose}
        className={({ isActive }) =>
          cn(
            'flex items-center gap-3 rounded-md px-3 py-2 transition-colors',
            level === 0 ? 'text-sidebar-foreground' : 'text-sidebar-foreground/80 text-sm',
            isActive
              ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
              : 'hover:bg-sidebar-accent/50'
          )
        }
      >
        {item.icon}
        <span>{item.label}</span>
      </NavLink>
    );
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 border-r bg-sidebar transition-transform duration-300 md:sticky md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col overflow-y-auto p-4">
          <nav className="space-y-2">
            {navigationItems.map(item => renderNavItem(item))}
          </nav>
        </div>
      </aside>
    </>
  );
};
