import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Calendar as CalendarIcon, Delete, Filter, X } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { BoxContainer } from "@/components/BoxContainer"
import { api } from "@/services/api"
import type { LogProps } from "@/types/interface"
import { LogTable } from "./_components/LogTable"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Logs() {
  const [date, setDate] = useState<Date | undefined>()
  const [time, setTime] = useState("")
  const [log, setLog] = useState<LogProps[]>([])
  const [filterType, setFilterType] = useState<'all' | 'emprestados'>('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        let data;
        if (filterType === 'emprestados') {
          data = await api.get('/itens/emprestados');
        } else {
          data = await api.get('/itens/logs');
        }
        setLog(data.data);
        console.log(data.data)
      } catch (error) {
        console.error("Erro ao carregar logs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [filterType]);

  const logsFiltrados = log.filter((logItem) => {
    const dataLog = new Date(logItem.dataEmprestimo);

    const correspondeData = date
      ? format(dataLog, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
      : true;

    const correspondeHora = time
      ? format(dataLog, "HH:mm") === time
      : true;

    return correspondeData && correspondeHora;
  });

  const hasActiveFilters = date || time;

  const clearAllFilters = () => {
    setDate(undefined);
    setTime("");
  };

  return (
    <BoxContainer>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Logs do Sistema</h1>
        <p className="text-gray-600">Visualize e filtre os registros de empréstimos e devoluções</p>
      </div>

      {/* FILTROS */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-gray-600" />
          <h2 className="font-semibold text-gray-900">Filtros</h2>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Filtro por data */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="date-picker" className="text-sm font-medium">Data</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[200px] justify-start text-left font-normal hover:bg-white"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "dd/MM/yyyy") : <span className="text-gray-500">Selecionar data</span>}
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
            <Label htmlFor="time-picker" className="text-sm font-medium">Hora</Label>
            <Input
              id="time-picker"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-[150px]"
              placeholder="00:00"
            />
          </div>

          {/* FILTROS GERAIS */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="filter-select" className="text-sm font-medium">Tipo</Label>
            <Select
              value={filterType}
              onValueChange={value => setFilterType(value as 'all' | 'emprestados')}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione um filtro" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Filtros</SelectLabel>
                  <SelectItem value="all">Todos os registros</SelectItem>
                  <SelectItem value="emprestados">Apenas emprestados</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Botão de limpar filtros */}
          {hasActiveFilters && (
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={clearAllFilters}
                className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
              >
                <X className="w-4 h-4" />
                Limpar filtros
              </Button>
            </div>
          )}
        </div>

        
        {hasActiveFilters && (
          <div className="mt-4 p-3  rounded-lg">
            <div className="flex items-center gap-2 text-sm text-blue-700">
              <Filter className="w-4 h-4" />
              <span className="font-medium">Filtros ativos:</span>
              {date && <span className="bg-blue-100 px-2 py-1 rounded">Data: {format(date, "dd/MM/yyyy")}</span>}
              {time && <span className="bg-blue-100 px-2 py-1 rounded">Hora: {time}</span>}
            </div>
          </div>
        )}
      </div>
      
      <div className="mb-4 flex flex-wrap gap-4 text-sm text-gray-600">
        <span>Total de registros: <strong>{log.length}</strong></span>
        <span>Registros filtrados: <strong>{logsFiltrados.length}</strong></span>
      </div>

      <LogTable logsFiltrados={logsFiltrados} filterType={filterType} />
    </BoxContainer>
  )
}
