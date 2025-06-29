import { BoxContainer } from "@/components/BoxContainer";
import { Button } from "@/components/ui/button";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { RefreshCw, AlertCircle, CheckCircle, XCircle } from "lucide-react";

interface RegisterProps {
  nome: string;
  codigo: string;
}

interface LatestRecordsProps {
  registerType: "item" | "usuario";
}

export function LatestRecords({ registerType }: LatestRecordsProps) {
  const [records, setRecords] = useState<RegisterProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [disablingItem, setDisablingItem] = useState<string | null>(null);

  async function ultimosRegistros() {
    setLoading(true);
    setError(null);
    try {
      const endpoint = registerType === "item" ? "itens" : "usuarios";
      const response = await api.get(`${endpoint}`);
      setRecords(response.data);
    } catch (err) {
      setError("Erro ao carregar registros. Tente novamente.");
      console.error("Erro ao carregar registros:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    ultimosRegistros();
  }, [registerType]);

  async function handleUpdateItem(cod: string) {
    setDisablingItem(cod);
    try {
      await api.put(`/itens/mudarStatus/${cod}`);
      setRecords(records?.filter((i) => i.codigo !== cod));
    } catch (error) {
      console.error("Erro ao desabilitar item:", error);
      setError("Erro ao desabilitar item. Tente novamente.");
    } finally {
      setDisablingItem(null);
    }
  }

  const getTypeLabel = () => registerType === "item" ? "Itens" : "Usuários";

  return (
    <section>
      <BoxContainer>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Últimos {getTypeLabel()} Registrados
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Visualize e gerencie os registros mais recentes
            </p>
          </div>
          <Button 
            onClick={ultimosRegistros} 
            disabled={loading}
            className="flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors min-w-[120px]"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? "Carregando..." : "Atualizar"}
          </Button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-3">
          {loading && records.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-3">
                <RefreshCw className="w-8 h-8 animate-spin text-gray-400" />
                <p className="text-gray-500">Carregando registros...</p>
              </div>
            </div>
          ) : records.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <p className="text-gray-900 font-medium">Nenhum registro encontrado</p>
                  <p className="text-gray-500 text-sm">
                    Não há {getTypeLabel().toLowerCase()} registrados ainda.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            records?.map((item, index) => (
              <div 
                key={index} 
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 bg-white"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">
                          {item.nome.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{item.nome}</p>
                        <p className="text-gray-500 text-sm">
                          Código: <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">{item.codigo}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleUpdateItem(item.codigo)}
                      disabled={disablingItem === item.codigo}
                      className="flex items-center justify-center gap-2 hover:bg-red-600 transition-colors min-w-[120px]"
                    >
                      {disablingItem === item.codigo ? (
                        <>
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          Desabilitando...
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3" />
                          Desabilitar
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {records.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Total de {records.length} {getTypeLabel().toLowerCase()} registrado{records.length > 1 ? 's' : ''}
            </p>
          </div>
        )}
      </BoxContainer>
    </section>
  );
}