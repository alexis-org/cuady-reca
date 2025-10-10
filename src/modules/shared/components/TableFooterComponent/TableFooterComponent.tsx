import React from 'react';
import { Response } from '../../interfaces/response.interface';
import { SelectSizeComponent } from './SelectSizeComponent';
import { PaginationComponent } from './PaginationComponent';

export interface TableFooterProps<T = unknown> {
  /** Información de la paginación desde el servidor */
  response: Response<T>;
  /** Callback que se ejecuta cuando el usuario cambia de página */
  onPageChange: (page: number) => void;
  /** Callback que se ejecuta cuando el usuario cambia el tamaño de página */
  onSizeChange: (size: number) => void;
  /** Indicador opcional de estado de carga */
  isLoading?: boolean;
}

/**
 * Componente de pie de tabla reutilizable que proporciona controles de paginación.
 * Integra subcomponentes para seleccionar tamaño de página y navegar entre páginas.
 * 
 * @param response - Datos de paginación del servidor (Response interface)
 * @param onPageChange - Función callback para manejar cambios de página
 * @param onSizeChange - Función callback para manejar cambios de tamaño de página
 * @param isLoading - Estado de carga opcional para deshabilitar controles
 */
export const TableFooterComponent: React.FC<TableFooterProps> = ({
  response,
  onPageChange,
  onSizeChange,
  isLoading = false,
}) => {
  const {
    totalElements,
    totalPages,
    size,
    number: currentPage,
    first,
    last,
  } = response;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t bg-background rounded-b-lg">
      {/* Información de registros totales y selector de tamaño */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          {totalElements === 0 
            ? 'No hay registros' 
            : `${totalElements} registro${totalElements === 1 ? '' : 's'} en total`
          }
        </span>
        
        <SelectSizeComponent
          currentSize={size}
          onSizeChange={onSizeChange}
          isLoading={isLoading}
        />
      </div>

      {/* Controles de paginación */}
      {totalPages > 0 && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          isFirst={first}
          isLast={last}
          onPageChange={onPageChange}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};