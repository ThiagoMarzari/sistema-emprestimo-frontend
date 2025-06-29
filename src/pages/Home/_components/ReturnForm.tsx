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
  const [loading, setLoading] = useState(false);

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

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!itemCode.trim()) {
      toast.error("Por favor, preencha o código do item.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("itens/devolver", {
        itemCodigo: itemCode.trim()
      });
      
      console.log("Movimentação registrada:", response.data);
      toast.success('Devolução registrada com sucesso!');
      setItemCode("");
      setUserCode("");
      setShowScanner(false);
    } catch (error) {
      console.error("Erro ao registrar movimentação:", error);
      toast.error('Erro ao registrar devolução. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form
      title="Devolver"
      description="Registre a devolução de itens preenchendo o código do item abaixo."
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
        disabled={loading}
      />
      <Button 
        type="submit" 
        disabled={loading || !itemCode.trim()}
        className="w-full"
      >
        {loading ? "Registrando..." : "Devolver Item"}
      </Button>
      <ShowScannerButton 
        code={handleScanner} 
        showScanner={showScanner} 
        onClick={() => setShowScanner(!showScanner)} 
      />
    </Form>
  );
}