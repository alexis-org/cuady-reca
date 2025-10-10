import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SelectSizeComponentProps {
  /** Tamaño actual de página */
  currentSize: number;
  /** Callback que se ejecuta cuando cambia el tamaño de página */
  onSizeChange: (size: number) => void;
  /** Indica si el componente está en estado de carga */
  isLoading?: boolean;
}

/**
 * Componente para seleccionar el tamaño de página en tablas paginadas.
 * Proporciona opciones predefinidas [5, 10, 20, 50] para controlar
 * cuántos elementos mostrar por página.
 */
export const SelectSizeComponent: React.FC<SelectSizeComponentProps> = ({
  currentSize,
  onSizeChange,
  isLoading = false,
}) => {
  const sizeOptions = [5, 10, 20, 50];

  const handleSizeChange = (value: string) => {
    const newSize = parseInt(value, 10);
    if (!isNaN(newSize)) {
      onSizeChange(newSize);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground whitespace-nowrap">
        Elementos por página:
      </span>
      <Select
        value={currentSize.toString()}
        onValueChange={handleSizeChange}
        disabled={isLoading}
      >
        <SelectTrigger className="w-20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sizeOptions.map((option) => (
            <SelectItem key={option} value={option.toString()}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};