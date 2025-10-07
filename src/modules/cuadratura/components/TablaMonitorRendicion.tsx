import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Badge } from '@/components/ui/badge';
import { CajeroRendicion } from '../interfaces/monitorRendicion.interface';
import { formatCurrency } from '@/helpers/generalHelpers';
import { FolderOpen, Eye, Trash2, FileText } from 'lucide-react';

interface TablaMonitorRendicionProps {
  cajeros: CajeroRendicion[];
}

export const TablaMonitorRendicion = ({ cajeros }: TablaMonitorRendicionProps) => {
  const handleContextMenuAction = (action: string, cajero: CajeroRendicion) => {
    console.log(`Acción: ${action}`, cajero);
  };

  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Código Cajero</TableHead>
            <TableHead>Nombre Cajero</TableHead>
            <TableHead>Estado de Rendición</TableHead>
            <TableHead className="text-right">Retiro (IRS)</TableHead>
            <TableHead className="text-right">Rendición</TableHead>
            <TableHead className="text-right">Diferencia de Caja</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cajeros.map((cajero) => (
            <ContextMenu key={cajero.id}>
              <ContextMenuTrigger asChild>
                <TableRow className="cursor-context-menu">
                  <TableCell className="font-mono">{cajero.codigoCajero}</TableCell>
                  <TableCell>{cajero.nombreCajero}</TableCell>
                  <TableCell>
                    <Badge
                      variant={cajero.estadoRendicion === 'ABIERTO' ? 'default' : 'secondary'}
                    >
                      {cajero.estadoRendicion}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {formatCurrency(cajero.retiroIRS)}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {formatCurrency(cajero.rendicion)}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {formatCurrency(cajero.diferenciaCaja)}
                  </TableCell>
                </TableRow>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem
                  onClick={() => handleContextMenuAction('Abrir rendición', cajero)}
                >
                  <FolderOpen className="mr-2 h-4 w-4" />
                  Abrir rendición
                </ContextMenuItem>
                <ContextMenuItem
                  onClick={() => handleContextMenuAction('Ver rendición', cajero)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Ver rendición
                </ContextMenuItem>
                <ContextMenuItem
                  onClick={() => handleContextMenuAction('Eliminar rendición', cajero)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Eliminar rendición
                </ContextMenuItem>
                <ContextMenuItem
                  onClick={() => handleContextMenuAction('Informe cierre cajero', cajero)}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Informe cierre cajero
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
