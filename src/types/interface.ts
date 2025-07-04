export interface ItemProps {
  nome: string;
  codigo: string;
  usuarioNome: string;
  usuarioCodigo: string;
}

export interface LogProps {
  id: number
  tipo: string
  itemNome: string
  itemCodigo: string
  usuarioNome: string
  usuarioCodigo: string
  dataEmprestimo: string
}