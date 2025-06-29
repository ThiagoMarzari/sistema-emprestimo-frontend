import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { ShowScannerButton } from "@/components/ShowScannerButton";
import { Form } from "@/components/Form";
import { InputLabel } from "@/components/InputLabel";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";

interface RegisterItemProps {
  registerType: "item" | "usuario";
}

export function RegisterForm({ registerType }: RegisterItemProps) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [focusedInput, setFocusedInput] = useState<"name" | "code" | null>(null);
  const [loading, setLoading] = useState(false);

  function handleScanner(code: string) {
    if (focusedInput === "name") {
      setName(code);
    } else if (focusedInput === "code") {
      setCode(code);
    } else if (!name) {
      setName(code);
    } else if (!code) {
      setCode(code);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!name.trim() || !code.trim()) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      await api.post(registerType === "item" ? "itens" : "usuarios", {
        nome: name.trim(),
        codigo: code.trim(),
      });
      
      toast.success("Cadastro realizado com sucesso!");
      setName("");
      setCode("");
      setShowScanner(false);
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      toast.error("Erro ao realizar cadastro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form
      title={registerType === "item" ? "Cadastrar Item" : "Cadastrar Usuário"}
      description={registerType === "item"
        ? "Preencha os dados abaixo para cadastrar um novo item no sistema."
        : "Preencha os dados abaixo para cadastrar um novo usuário no sistema."}
      onSubmit={handleSubmit}
    >
      <InputLabel
        label={registerType === "item" ? "Nome do item" : "Nome do usuário"}
        id="name"
        value={name}
        placeholder={registerType === "item" ? "Digite o nome do item" : "Digite o nome do usuário"}
        onChange={e => setName(e.target.value)}
        autoComplete="off"
        autoFocus
        onFocus={() => setFocusedInput("name")}
        onBlur={() => setFocusedInput(null)}
        disabled={loading}
      />
      <InputLabel
        label={registerType === "item" ? "Código do item" : "Código do usuário"}
        id="itemCode"
        value={code}
        placeholder={registerType === "item" ? "Digite o código do item" : "Digite o código do usuário"}
        onChange={e => setCode(e.target.value)}
        autoComplete="off"
        onFocus={() => setFocusedInput("code")}
        onBlur={() => setFocusedInput(null)}
        disabled={loading}
      />
      <ShowScannerButton
        code={handleScanner}
        showScanner={showScanner}
        onClick={() => setShowScanner(!showScanner)}
      />
      <Button 
        type="submit" 
        disabled={loading || !name.trim() || !code.trim()}
        className="w-full"
      >
        {loading ? "Cadastrando..." : (registerType === "item" ? "Cadastrar Item" : "Cadastrar Usuário")}
      </Button>
    </Form>
  );
}
