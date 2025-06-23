import { LatestRecords } from "./_components/LastestRecords";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { RegisterForm } from "./_components/RegisterForm";

export default function Register() {

  return (
    <div className="flex mx-auto w-full flex-col gap-6">

      <Tabs defaultValue="item">
        <TabsList>
          <TabsTrigger value="item">Cadastrar Item</TabsTrigger>
          <TabsTrigger value="usuario">Cadastrar Usuário</TabsTrigger>
        </TabsList>
        <TabsContent value="item">
          <div className="w-full flex flex-col lg:flex-row items-start justify-center gap-4">
            <RegisterForm registerType="item" />
            <div className="w-full">
              <LatestRecords registerType="item" />
            </div>
          </div>

        </TabsContent>
        <TabsContent value="usuario">
          <div className="w-full flex flex-col lg:flex-row items-start justify-center gap-4">
            <RegisterForm registerType="usuario" />
            <div className="w-full">
              <LatestRecords registerType="usuario" />
            </div>
          </div>

        </TabsContent>
      </Tabs>

    </div>
  );
}