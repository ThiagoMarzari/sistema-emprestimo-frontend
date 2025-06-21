import { Input } from "./ui/input";
import { Label } from "./ui/label";
import React from "react";

interface InputLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function InputLabel({ label, id, ...props }: InputLabelProps) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        {...props}
        className="mt-2"
      />
    </div>
  );
}