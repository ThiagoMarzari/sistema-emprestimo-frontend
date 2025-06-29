import { api } from "@/services/api";
import type {  ItemProps } from "@/types/interface";
import { useEffect, useState } from "react";

export function ItensOnLoan() {

  const [itens, setItens] = useState<ItemProps[]>([]);

  useEffect(() => {
        async function fetchData() {
          const res = await api.get("/itens/emprestados");
          setItens(res.data);
        }

    fetchData();
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold mb-4">Itens em Empréstimo</h1>
      <div className="flex flex-col items-center w-full max-w-3xl md:flex-row gap-4">
      {itens.map((item, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4 w-full max-w-md">
          <h2 className="text-xl font-semibold">{item.nome}</h2>
          <p><strong>Código:</strong> {item.codigo}</p>
          <p><strong>Usuário:</strong> {item.usuarioNome} ({item.usuarioCodigo})</p>
        </div>
      ))}
      </div>
    </div>
  );
}