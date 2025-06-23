import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { ShowScannerButton } from "@/components/ShowScannerButton";
import { Form } from "@/components/Form";
import { InputLabel } from "@/components/InputLabel";

interface RegisterItemProps {
  registerType: "item" | "usuario";
}

export function RegisterForm({ registerType }: RegisterItemProps) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [focusedInput, setFocusedInput] = useState<"name" | "code" | null>(null);

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

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!name || !code) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }
    // Aqui você pode adicionar a lógica de envio para a API
    toast.success("Cadastro realizado com sucesso!");
    setName("");
    setCode("");
    setShowScanner(false);
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
      />
      <ShowScannerButton
        code={handleScanner}
        showScanner={showScanner}
        onClick={() => setShowScanner(!showScanner)}
      />
    </Form>
  );
}
