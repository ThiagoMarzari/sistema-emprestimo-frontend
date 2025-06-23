import { BoxContainer } from "@/components/BoxContainer";
import { Button } from "@/components/ui/button";
import { api } from "@/services/api";
import { useEffect, useState } from "react";

interface RegisterProps {
  id: number;
  nome: string;
  codigo: string;
}

interface LatestRecordsProps {
  registerType: "item" | "usuario";
}

export function LatestRecords({ registerType }: LatestRecordsProps) {

  const [records, setRecords] = useState<RegisterProps[]>([]);

  async function ultimosRegistros() {
    const endpoint = registerType === "item" ? "itens" : "usuarios";
    const response = await api.get(`${endpoint}`);
    setRecords(response.data);
    console.log(response.data);
  }

  useEffect(() => {
    ultimosRegistros();
  }, [registerType])

  async function handleDelete(id: number) {
    try {
      await api.delete(`/itens/${id}`);
      setRecords(records?.filter((i) => i.id !== id));
    } catch (error) {
      console.error("Erro ao deletar item:", error);
    }
  }

  return (
    <section>
      <BoxContainer>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl">Últimos registros feitos</h2>
          <Button onClick={ultimosRegistros}>
            Ver últimos registros
          </Button>
        </div>

        <div>
          {records?.map((item, index) => (
            <div key={index} className="border-b py-2 flex items-center justify-between">
              <div>
                <p className="font-semibold">{item.nome}</p>
                <p className="text-gray-600">Código: {item.codigo}</p>
              </div>
              <Button variant={"destructive"} onClick={() => handleDelete(item.id)}>
                Deletar
              </Button>
            </div>
          ))}
        </div>
      </BoxContainer>

    </section >
  )
}