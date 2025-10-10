import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight 
} from 'lucide-react';

interface PaginationComponentProps {
  /** Página actual (0-indexada) */
  currentPage: number;
  /** Total de páginas disponibles */
  totalPages: number;
  /** Indica si es la primera página */
  isFirst: boolean;
  /** Indica si es la última página */
  isLast: boolean;
  /** Callback que se ejecuta cuando cambia la página */
  onPageChange: (page: number) => void;
  /** Indica si el componente está en estado de carga */
  isLoading?: boolean;
}

/**
 * Componente de navegación de páginas para tablas paginadas.
 * Proporciona botones de navegación: Primera, Anterior, Siguiente, Última.
 * Los botones se deshabilitan automáticamente según el estado de la paginación.
 */
export const PaginationComponent: React.FC<PaginationComponentProps> = ({
  currentPage,
  totalPages,
  isFirst,
  isLast,
  onPageChange,
  isLoading = false,
}) => {
  const handleFirstPage = () => {
    if (!isFirst && !isLoading) {
      onPageChange(0);
    }
  };

  const handlePreviousPage = () => {
    if (!isFirst && !isLoading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (!isLast && !isLoading) {
      onPageChange(currentPage + 1);
    }
  };

  const handleLastPage = () => {
    if (!isLast && !isLoading && totalPages > 0) {
      onPageChange(totalPages - 1);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground whitespace-nowrap">
        Página {currentPage + 1} de {totalPages}
      </span>
      
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          onClick={handleFirstPage}
          disabled={isFirst || isLoading || totalPages <= 1}
          className="h-8 w-8"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={handlePreviousPage}
          disabled={isFirst || isLoading}
          className="h-8 w-8"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={handleNextPage}
          disabled={isLast || isLoading}
          className="h-8 w-8"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={handleLastPage}
          disabled={isLast || isLoading || totalPages <= 1}
          className="h-8 w-8"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};