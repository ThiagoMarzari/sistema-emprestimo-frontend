import { BoxContainer } from "@/components/BoxContainer";
import { Form } from "@/components/Form";
import { InputLabel } from "@/components/InputLabel";
import { ShowScannerButton } from "@/components/ShowScannerButton";
import { Button } from "@/components/ui/button";
import { api } from "@/services/api";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { LoanForm } from "./_components/LoanForm";
import { ReturnForm } from "./_components/ReturnForm";

export default function Home() {

  const [itemCode, setItemCode] = useState("");
  const [userCode, setUserCode] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [focusedInput, setFocusedInput] = useState<"itemCode" | "userCode" | null>(null);
  const [selected, setSelected] = useState<"emprestimo" | "devolucao" | null>("emprestimo");
  return (
    <div>

      <Tabs defaultValue="emprestimo">
        <TabsList className="max-w-3xl w-full mx-auto ">
          <TabsTrigger value="emprestimo">
            Emprestar
          </TabsTrigger>
          <TabsTrigger value="devolucao">
            Devolver
          </TabsTrigger>
        </TabsList>
        <TabsContent value="emprestimo">

          <LoanForm />
          
        </TabsContent>
        <TabsContent value="devolucao">
         <ReturnForm />
        </TabsContent>
      </Tabs>



      {/* Acoes */}

    </div>
  );
}