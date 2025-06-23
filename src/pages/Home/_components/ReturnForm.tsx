import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { api } from "@/services/api";
import { Form } from "@/components/Form";
import { InputLabel } from "@/components/InputLabel";
import { ShowScannerButton } from "@/components/ShowScannerButton";
import { Button } from "@/components/ui/button";

export function ReturnForm() {
  const [itemCode, setItemCode] = useState("");
  const [userCode, setUserCode] = useState("");
  const [focusedInput, setFocusedInput] = useState<"itemCode" | "userCode" | null>(null);
  const [showScanner, setShowScanner] = useState(false);

  function handleScanner(code: string) {
    if (focusedInput === "itemCode") {
      setItemCode(code);
    } else if (focusedInput === "userCode") {
      setUserCode(code);
    } else if (!itemCode) {
      setItemCode(code);
    } else if (!userCode) {
      setUserCode(code);
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    api.post("itens/devolver", {
      itemCodigo: itemCode
    })
      .then(response => {
        console.log("Movimentação registrada:", response.data);
        toast.success('Movimentação registrada com sucesso!');
        setItemCode("");
        setUserCode("");
      })
      .catch(error => {
        console.error("Erro ao registrar movimentação:", error);
        toast.error('Erro ao registrar movimentação. Tente novamente.');
      });
  }

  return (
    <Form
      title="Devolver"
      description="Gerencie o empréstimo e devolução de itens preenchendo os campos abaixo."
      onSubmit={handleSubmit}
    >
      <InputLabel
        label="Código do item"
        id="itemCode"
        value={itemCode}
        placeholder="Digite o código do item"
        onChange={e => setItemCode(e.target.value)}
        onFocus={() => setFocusedInput("itemCode")}
        onBlur={() => setFocusedInput(null)}
        autoComplete="off"
        autoFocus
      />
      <Button type="submit" className="w-full">
        Devolver Item
      </Button>
      <ShowScannerButton code={handleScanner} showScanner={showScanner} onClick={() => setShowScanner(!showScanner)} />
    </Form>
  );
}