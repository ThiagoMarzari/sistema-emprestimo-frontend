import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { api } from "@/services/api";
import { Form } from "@/components/Form";
import { InputLabel } from "@/components/InputLabel";
import { ShowScannerButton } from "@/components/ShowScannerButton";

export function LoanForm() {
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

    api.post("itens/emprestar", {
      itemCodigo: itemCode,
      usuarioCodigo: userCode,
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
      title="Emprestar"
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
      <InputLabel
        label="Código do usuário"
        id="userCode"
        value={userCode}
        placeholder="Digite o código do usuário"
        onChange={e => setUserCode(e.target.value)}
        onFocus={() => setFocusedInput("userCode")}
        onBlur={() => setFocusedInput(null)}
        autoComplete="off"
      />
      <ShowScannerButton code={handleScanner} showScanner={showScanner} onClick={() => setShowScanner(!showScanner)} />
    </Form>
  );
}