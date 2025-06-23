import { Form } from "@/components/Form";
import { InputLabel } from "@/components/InputLabel";
import { ShowScannerButton } from "@/components/ShowScannerButton";
import { api } from "@/services/api";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";

export default function Home() {

  const [itemCode, setItemCode] = useState("");
  const [userCode, setUserCode] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [focusedInput, setFocusedInput] = useState<"itemCode" | "userCode" | null>(null);

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

    api.post("itens/movimentacao", {
      itemCodigo: itemCode,
      usuarioCodigo: userCode,
    }).then(response => {
      console.log("Movimentação registrada:", response.data);
      toast.success('Movimentação registrada com sucesso!')
    })
      .catch(error => {
        console.error("Erro ao registrar movimentação:", error);
        toast.error('Erro ao registrar movimentação. Tente novamente.')
      });

    setItemCode("");
    setUserCode("");
  }

  return (
    <div>

      <Form
        title="Emprestar/Devolver"
        description="Gerencie o empréstimo e devolução de itens preenchendo os campos abaixo."
        onSubmit={handleSubmit}
      >
        <InputLabel
          label="Código do item"
          id="itemCode"
          value={itemCode}
          placeholder="Digite o código do item"
          onChange={(e) => setItemCode(e.target.value)}
          onFocus={() => setFocusedInput("itemCode")}
          onBlur={() => setFocusedInput(null)}
          autoComplete="off"
          autoFocus
        />
        <InputLabel
          label="Código do usuário"
          id="userCode"
          placeholder="Digite o código do usuário"
          autoComplete="off"
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
          onFocus={() => setFocusedInput("userCode")}
          onBlur={() => setFocusedInput(null)}
        />

        <ShowScannerButton code={handleScanner} showScanner={showScanner} onClick={() => setShowScanner(!showScanner)} />
      </Form>

      {/* Acoes */}

    </div>
  );
}