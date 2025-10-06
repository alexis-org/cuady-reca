import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SeccionCierre } from '../interfaces/cierreDia.interface';
import { formatCurrency } from '@/helpers/generalHelpers';

interface TablaCierreProps {
  seccion: SeccionCierre;
}

export const TablaCierre = ({ seccion }: TablaCierreProps) => {
  return (
    <Card>
      <CardHeader className="bg-primary/10">
        <CardTitle className="text-center text-primary font-semibold">
          {seccion.titulo}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Detalle</TableHead>
              <TableHead className="text-right">Monto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {seccion.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell
                  className={
                    item.nivel === 1
                      ? 'pl-8 text-muted-foreground text-sm'
                      : 'font-medium'
                  }
                >
                  {item.detalle}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {formatCurrency(item.monto)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-primary/5 font-bold">
              <TableCell>Total</TableCell>
              <TableCell className="text-right font-mono">
                {formatCurrency(seccion.total)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
