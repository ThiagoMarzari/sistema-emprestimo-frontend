import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Calendar as CalendarIcon, Delete } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

type Movimentacao = {
  id: number
  dataHora: string
  item: string
  usuario: string
  tipo: "EMPRESTIMO" | "DEVOLUCAO"
}

const movimentacoesMock: Movimentacao[] = [
  {
    id: 1,
    dataHora: "2025-06-16T09:45",
    item: "Chave Sala 101",
    usuario: "Maria dos Santos",
    tipo: "EMPRESTIMO",
  },
  {
    id: 2,
    dataHora: "2025-06-16T11:20",
    item: "Controle Proj. 202",
    usuario: "João da Silva",
    tipo: "DEVOLUCAO",
  },
  {
    id: 3,
    dataHora: "2025-06-15T17:10",
    item: "Chave Laboratório",
    usuario: "Fernanda Lima",
    tipo: "EMPRESTIMO",
  },
]

export default function Logs() {
  const [date, setDate] = useState<Date | undefined>()
  const [time, setTime] = useState("")

  const movimentacoesFiltradas = movimentacoesMock.filter((mov) => {
    const dataFormatada = new Date(mov.dataHora)
    const matchData = date
      ? format(dataFormatada, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
      : true
    const matchHora = time ? format(dataFormatada, "HH:mm") === time : true
    return matchData && matchHora
  })

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Filtro por data */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="date-picker">Data</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[200px] justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "dd/MM/yyyy") : <span>Selecionar data</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                locale={ptBR}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Filtro por hora */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="time-picker">Hora</Label>
          <Input
            id="time-picker"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-[150px]"
          />
        </div>

        {/* Botão de limpar filtros */}
        <div className="flex items-end">
          <Button
            variant="ghost"
            onClick={() => {
              setDate(undefined)
              setTime("")
            }}
          >
            <Delete />
          </Button>
        </div>
      </div>

      {/* Tabela */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Item</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Usuário</TableHead>
            <TableHead className="text-right">Data/Hora</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movimentacoesFiltradas.map((mov) => (
            <TableRow key={mov.id}>
              <TableCell className="font-medium">{mov.item}</TableCell>
              <TableCell>{mov.tipo}</TableCell>
              <TableCell>{mov.usuario}</TableCell>
              <TableCell className="text-right">
                {new Date(mov.dataHora).toLocaleString("pt-BR")}
              </TableCell>
            </TableRow>
          ))}
          {movimentacoesFiltradas.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center italic py-4 text-gray-400">
                Nenhuma movimentação encontrada.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
