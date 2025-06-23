import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { api } from "@/services/api";
import { LatestRecords } from "./_components/LastestRecords";
import { Form } from "@/components/Form";
import { InputLabel } from "@/components/InputLabel";
import { ShowScannerButton } from "@/components/ShowScannerButton";
import { BoxContainer } from "@/components/BoxContainer";

export default function Register() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [focusedInput, setFocusedInput] = useState<"name" | "code" | null>(null);
  const [registerType, setRegisterType] = useState<"item" | "usuario">("item");

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

    console.log("Nome do item:", name);
    console.log("Código do item:", code);
    if (!name || !code) {
      toast.error("Por favor, preencha todos os campos.")
      return;
    }

    const endpoint = registerType === "item" ? "itens" : "usuarios";

    api.post(`/${endpoint}`, {
      nome: name,
      codigo: code,
    }).then((res) => {
      console.log("Item cadastrado:", res.data);
      toast.success('Item cadastrado!')
      setName("")
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

      <BoxContainer>
        <p className="mb-2 text-gray-600">Escolha o tipo de cadastro que deseja realizar:</p>

        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="registerType"
              value="item"
              checked={registerType === "item"}
              onChange={() => setRegisterType("item")}
              className="accent-blue-600 w-4 h-4"
            />
            <span className="text-gray-700 font-medium">Cadastrar Item</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="registerType"
              value="usuario"
              checked={registerType === "usuario"}
              onChange={() => setRegisterType("usuario")}
              className="accent-blue-600 w-4 h-4"
            />
            <span className="text-gray-700 font-medium">Cadastrar Usuário</span>
          </label>
        </div>
      </BoxContainer>

      {/* FORM */}
      <div className="w-full flex flex-col lg:flex-row items-start justify-center gap-4">

        <Form
          title={registerType === "item" ? "Cadastrar Item" : "Cadastrar Usuário"}
          description={registerType === "item"
            ? "Preencha os dados abaixo para cadastrar um novo item no sistema."
            : "Preencha os dados abaixo para cadastrar um novo usuário no sistema."}
          onSubmit={handleSubmit}

        >
          <InputLabel label={"Nome"} id="name" value={name} placeholder="Digite o nome" onChange={(e) => setName(e.target.value)} autoComplete="off" autoFocus
            onFocus={() => setFocusedInput("name")}
            onBlur={() => setFocusedInput(null)}
          />
          <InputLabel label={"Código"} id="itemCode" placeholder="Digite o código" value={code} onChange={(e) => setCode(e.target.value)} autoComplete="off"
            onFocus={() => setFocusedInput("code")}
            onBlur={() => setFocusedInput(null)}
          />
          <ShowScannerButton
            code={handleScanner}
            showScanner={showScanner}
            onClick={() => setShowScanner(!showScanner)}
          />

        </Form>

        <div className="w-full">
          <LatestRecords type={registerType} />
        </div>

      </div>


    </div >
  )
}