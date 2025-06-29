import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { api } from "@/services/api";
import { Form } from "@/components/Form";
import { InputLabel } from "@/components/InputLabel";
import { ShowScannerButton } from "@/components/ShowScannerButton";
import { Button } from "@/components/ui/button";

export function LoanForm() {
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

    if (!itemCode.trim() || !userCode.trim()) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("itens/emprestar", {
        itemCodigo: itemCode.trim(),
        usuarioCodigo: userCode.trim(),
      });
      
      console.log("Movimentação registrada:", response.data);
      toast.success('Empréstimo registrado com sucesso!');
      setItemCode("");
      setUserCode("");
      setShowScanner(false);
    } catch (error) {
      console.error("Erro ao registrar movimentação:", error);
      toast.error('Erro ao registrar empréstimo. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form
      title="Emprestar"
      description="Gerencie o empréstimo de itens preenchendo os campos abaixo."
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
      <InputLabel
        label="Código do usuário"
        id="userCode"
        value={userCode}
        placeholder="Digite o código do usuário"
        onChange={e => setUserCode(e.target.value)}
        onFocus={() => setFocusedInput("userCode")}
        onBlur={() => setFocusedInput(null)}
        autoComplete="off"
        disabled={loading}
      />
      <Button 
        type="submit" 
        disabled={loading || !itemCode.trim() || !userCode.trim()}
        className="w-full"
      >
        {loading ? "Registrando..." : "Registrar Empréstimo"}
      </Button>
      <ShowScannerButton 
        code={handleScanner} 
        showScanner={showScanner} 
        onClick={() => setShowScanner(!showScanner)} 
      />
    </Form>
  );
}