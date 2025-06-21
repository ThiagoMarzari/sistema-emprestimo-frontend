import type React from "react";
import { Button } from "./ui/button";
import type { ReactNode } from "react";

interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  title: string;
  description: string;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

export function Form({ title, description, children, ...props }: FormProps) {
  return (
    <form
      className="h-full flex items-center justify-center mt-20"
      {...props}
    >
      <div className="flex flex-col rounded-lg p-6 w-full max-w-lg shadow-2xl bg-white">
        <h1 className="font-bold text-center text-4xl mb-4">{title}</h1>
        <span
          className="text-gray-500 mb-8 text-center">
          {description}
        </span>

        {/* INPUT SECTION */}
        <div className="w-full max-w-lg flex flex-col gap-3 mb-4">
          {children}
        </div>

        {/* Ao clicar vai fazer uma req para o backend */}
        <Button type="submit" className="flex items-center gap-2">
          Cadastrar
        </Button>
      </div>
    </form>
  )
}