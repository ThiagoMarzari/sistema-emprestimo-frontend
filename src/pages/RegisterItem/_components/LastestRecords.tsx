import { Button } from "@/components/ui/button";
import { api } from "@/services/api";
import { useEffect, useState } from "react";

interface ItemProps {
  id: number;
  nome: string;
  codigo: string;
}

export function LastestRecords() {

  const [records, setRecords] = useState<ItemProps[]>();

  async function ultimosRegistros() {
    const response = await api.get("/itens");
    setRecords(response.data.reverse());
  }

  useEffect(() => {
    ultimosRegistros();
  }, [])

  async function handleDelete(id: number) {
    try {
      await api.delete(`/itens/${id}`);
      setRecords(records?.filter((i) => i.id !== id));
    } catch (error) {
      console.error("Erro ao deletar item:", error);
    }
  }

  return (
    <section className="py-2">
      <div className="w-full max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl">Últimos registros feitos</h2>
          <Button onClick={ultimosRegistros} className="mt-4">
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
      </div>

    </section >
  )
}