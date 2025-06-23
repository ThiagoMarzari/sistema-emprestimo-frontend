import type React from "react";
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
      className="h-full w-full flex items-center justify-center"
      {...props}
    >
      <div className="flex flex-col items-center rounded-lg p-6 w-full border max-w-3xl shadow-md bg-white">
        <h1 className="font-bold text-center text-4xl mb-4">{title}</h1>
        <span
          className="text-gray-500 mb-6 text-center">
          {description}
        </span>

        {/* INPUT SECTION */}
        <div className="w-full flex flex-col gap-3 mb-4">
          {children}
        </div>

      </div>
    </form>
  )
}