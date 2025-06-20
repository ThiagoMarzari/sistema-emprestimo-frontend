import { Button } from "@/components/ui/button";
import { BarcodeScanner } from "../../components/BarcodeScanner";
import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import toast from "react-hot-toast";
import { api } from "@/services/api";
import { LastestRecords } from "./_components/LastestRecords";

export default function RegisterItem() {

  const [itemName, setItemName] = useState("");
  const [code, setCode] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!itemName || !code) {
      toast.error("Por favor, preencha todos os campos.")
      return;
    }

    api.post("/itens", {
      nome: itemName,
      codigo: code,
    }).then((res) => {
      console.log("Item registrado:", res.data);
      toast.success('Item cadastrado!')
      setItemName("")
      setCode("")
      setShowScanner(false)
    }).catch((err) => {
      console.error("Erro ao registrar item:", err.response?.data);
      toast.error('Erro ao cadastrar item: ', err.response?.data || 'Erro desconhecido');
    }
    );
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="h-full flex items-center justify-center mt-20"
      >
        <div className="flex flex-col rounded-lg p-6 w-full max-w-lg shadow-2xl bg-white">
          <h1 className="font-bold text-center text-4xl mb-4">Registrar item</h1>
          <span
            className="text-gray-500 mb-8 text-center">
            Preencha os dados abaixo para cadastrar um novo item no sistema.
          </span>

          <div className="w-full max-w-lg flex flex-col gap-3 mb-4">

            <div>
              <Label htmlFor="itemName">Nome</Label>
              <Input
                id="itemName"
                placeholder="Digite o nome do item"
                value={itemName}
                onChange={e => setItemName(e.target.value)}
                autoComplete="off"
                autoFocus
              />
            </div>

            <div className="mb-8">
              <Label htmlFor="itemCode">Código</Label>
              <Input
                id="itemCode"
                placeholder="Digite o código do item"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                autoComplete="off"
              />
            </div>

          </div>

          <Button
            type="button"
            onClick={() => setShowScanner(!showScanner)}
            className="mb-4"
          >
            {showScanner ? "Fechar Scanner" : "Abrir Scanner"}
          </Button>

          {showScanner && (
            <BarcodeScanner onDetected={(code) => {
              setCode(code);
            }} />
          )}

          {/* Ao clicar vai fazer uma req para o backend */}
          <Button type="submit" className="flex items-center gap-2">
            Cadastrar
          </Button>
        </div>
      </form>

      <LastestRecords />
    </div >
  )
}