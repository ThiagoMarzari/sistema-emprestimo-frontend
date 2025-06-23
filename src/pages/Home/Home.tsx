
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { LoanForm } from "./_components/LoanForm";
import { ReturnForm } from "./_components/ReturnForm";

export default function Home() {
  return (
    <div className="flex mx-auto w-full max-w-3xl flex-col gap-6">
      
      <Tabs defaultValue="emprestimo">
        <TabsList>
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