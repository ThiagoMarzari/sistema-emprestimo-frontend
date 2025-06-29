import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { LogProps } from "@/types/interface";

interface LogTableProps {
  logsFiltrados: LogProps[];
  filterType: 'all' | 'emprestados';
}

export function LogTable({ logsFiltrados, filterType }: LogTableProps) {
  if (logsFiltrados.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 mb-2">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-gray-500 text-lg font-medium">Nenhum log encontrado</p>
        <p className="text-gray-400 text-sm">Tente ajustar os filtros para encontrar os registros desejados</p>
      </div>
    );
  } 

  const getStatusBadge = (tipo: string | null) => {
    // Se o filtro é "emprestados", todos são emprestados
    if (filterType === 'emprestados') {
      return <Badge variant="destructive">EMPRESTIMO</Badge>;
    }
    
    // Se o filtro é "all", verificar o tipo real
    if (tipo === null || tipo === "EMPRESTIMO") {
      return <Badge variant="destructive">EMPRESTIMO</Badge>;
    }
    return <Badge variant="default">DEVOLUÇAO</Badge>;
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Item</TableHead>
            <TableHead className="w-[120px]">Status</TableHead>
            <TableHead className="w-[200px]">Usuário</TableHead>
            <TableHead className="w-[180px]">Data/Hora</TableHead>
            <TableHead className="w-[100px]">Código</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logsFiltrados.map((log, index) => (
            <TableRow key={index} className="hover:bg-gray-50 transition-colors">
              <TableCell className="font-medium">
                <div>
                  <div className="font-semibold text-gray-900">{log.itemNome}</div>
                </div>
              </TableCell>
              <TableCell>
                {getStatusBadge(log.tipo)}
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium text-gray-900">{log.usuarioNome}</div>
                  <div className="text-xs text-gray-500">{log.usuarioCodigo}</div>
                </div>
              </TableCell>
              <TableCell className="text-sm text-gray-600">
                {formatDateTime(log.dataEmprestimo)}
              </TableCell>
              <TableCell>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {log.itemCodigo}
                </code>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}