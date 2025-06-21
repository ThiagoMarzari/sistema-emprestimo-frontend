import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { api } from "@/services/api";
import { LastestRecords } from "./_components/LastestRecords";
import { Form } from "@/components/Form";
import { InputLabel } from "@/components/InputLabel";
import { ShowScannerButton } from "@/components/ShowScannerButton";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Label } from "@radix-ui/react-label";

export default function RegisterItem() {

  const [itemName, setItemName] = useState("");
  const [code, setCode] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [focusedInput, setFocusedInput] = useState<"itemName" | "code" | null>(null);

  function handleScanner(code: string) {
    if (focusedInput === "itemName") {
      setItemName(code);
    } else if (focusedInput === "code") {
      setCode(code);
    } else if (!itemName) {
      setItemName(code);
    } else if (!code) {
      setCode(code);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    console.log("Nome do item:", itemName);
    console.log("Código do item:", code);
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
      <div className="bg-red-500">

      </div>



      <Form
        title={"Registrar"}
        description={"Preencha os dados abaixo para cadastrar um novo item no sistema."}
        onSubmit={handleSubmit}
      >
        <InputLabel label={"Nome do item"} id="itemName" value={itemName} placeholder="Digite o nome do item" onChange={(e) => setItemName(e.target.value)} autoComplete="off" autoFocus
          onFocus={() => setFocusedInput("itemName")}
          onBlur={() => setFocusedInput(null)}
        />

        <InputLabel label={"Código do item"} id="itemCode" placeholder="Digite o código do item" value={code} onChange={(e) => setCode(e.target.value)} autoComplete="off"
          onFocus={() => setFocusedInput("code")}
          onBlur={() => setFocusedInput(null)}
        />

        <ShowScannerButton
          code={handleScanner}
          showScanner={showScanner}
          onClick={() => setShowScanner(!showScanner)}
        />
      </Form>

      <LastestRecords />
    </div >
  )
}