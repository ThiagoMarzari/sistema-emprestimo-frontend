import { Form } from "@/components/Form";
import { InputLabel } from "@/components/InputLabel";
import { ShowScannerButton } from "@/components/ShowScannerButton";
import { useState, type FormEvent } from "react";

export default function Home() {

  const [itemCode, setItemCode] = useState("");
  const [userCode, setUserCode] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    // Aqui você pode adicionar a lógica para enviar os dados do formulário
    // Por exemplo, fazer uma requisição para o backend com os códigos do item e do usuário

    console.log("Código do item:", itemCode);
    console.log("Código do usuário:", userCode);

    // Limpar os campos após o envio
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
        />

        <ShowScannerButton code={setItemCode} showScanner={showScanner} onClick={() => setShowScanner(!showScanner)} />
      </Form>

      {/* Acoes */}

    </div>
  );
}