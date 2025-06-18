import { BarcodeScanner } from "../components/BarcodeScanner";
import { useState } from "react";

export default function RegisterItem() {

  const [code, setCode] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  return (
    <form className="w-full container mx-auto flex items-center justify-center flex-col p-4">

      <h1 className="font-bold text-4xl mb-1">Registrar item</h1>
      <span className="text-gray-500 mb-6">Preencha os dados abaixo para cadastrar um novo item no sistema.</span>

      <div className="w-full max-w-lg flex flex-col gap-3">
        <label htmlFor="itemName" className="font-medium mb-1">Nome:</label>
        <input
          id="itemName"
          type="text"
          name="itemName"
          placeholder="Digite o nome do item"
          className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <label htmlFor="itemCode" className="font-medium mb-1 mt-2">Código:</label>
        <div className="flex gap-2 items-center">
          <input
            id="itemCode"
            type="text"
            name="itemCode"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Digite ou escaneie o código de barras"
            className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            autoComplete="off"
          />
        </div>
      </div>

      <button
        type="button"
        className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors cursor-pointer"
        onClick={() => setShowScanner(!showScanner)}
      >
        {showScanner ? "Fechar Scanner" : "Abrir Scanner"}
      </button>

      {showScanner && (
        <BarcodeScanner onDetected={(code) => {
          console.log(code);
          setCode(code);
        }} />
      )}

      {/* Ao clicar vai fazer uma req para o backend */}
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors cursor-pointer" type="submit">
        Cadastrar
      </button>

    </form>
  )
}