import { useEffect, useState } from "react"
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

  useEffect(() => {
    async function fetchData() {
      let data;
      if (filterType === 'emprestados') {
        data = await api.get('/itens/emprestados');
      } else {
        data = await api.get('/itens/logs');
      }
      setLog(data.data);
      console.log(data.data)
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


  return (
    <BoxContainer>

      {/* FILTROS */}
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

        {/* FILTROS GERAIS */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="fruit-select">Filtros</Label>
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
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="emprestados">Emprestados</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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

      <LogTable logsFiltrados={logsFiltrados} filterType={filterType} />

    </BoxContainer>
  )
}
