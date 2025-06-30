import { useState, useEffect } from "react";
import { BoxContainer } from "@/components/BoxContainer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { api } from "@/services/api";
import { RefreshCw, CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface ItemProps {
  nome: string;
  codigo: string;
  disponivel: boolean;
  habilitado: boolean;
}

export function ItemsManager() {
  const [items, setItems] = useState<ItemProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [changingStatus, setChangingStatus] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'disabled'>('all');

  async function fetchItems() {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("itens");
      setItems(response.data);
    } catch (err) {
      setError("Erro ao carregar itens. Tente novamente.");
      console.error("Erro ao carregar itens:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  async function handleStatusChange(codigo: string, newStatus: boolean) {
    setChangingStatus(codigo);
    try {
      await api.put(`/itens/mudarStatus/${codigo}`);
      setItems(items.map(item => 
        item.codigo === codigo 
          ? { ...item, habilitado: newStatus }
          : item
      ));
    } catch (error) {
      console.error("Erro ao alterar status:", error);
      setError("Erro ao alterar status do item. Tente novamente.");
    } finally {
      setChangingStatus(null);
    }
  }

  const filteredItems = items.filter(item => {
    if (filter === 'active') return item.habilitado;
    if (filter === 'disabled') return !item.habilitado;
    return true;
  });

  const activeCount = items.filter(item => item.habilitado).length;
  const disabledCount = items.filter(item => !item.habilitado).length;

  return (
    <section>
      <BoxContainer>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Gerenciar Itens
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Visualize e gerencie o status de todos os itens do sistema
            </p>
          </div>
          <Button 
            onClick={fetchItems} 
            disabled={loading}
            className="flex items-center gap-2 transition-colors"
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

        {/* Filtros e Estatísticas */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              Todos ({items.length})
            </Button>
            <Button
              variant={filter === 'active' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('active')}
              className="text-green-600 hover:text-green-700"
            >
              Habilitados ({activeCount})
            </Button>
            <Button
              variant={filter === 'disabled' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('disabled')}
              className="text-red-600 hover:text-red-700"
            >
              Desabilitados ({disabledCount})
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {loading && items.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-3">
                <RefreshCw className="w-8 h-8 animate-spin text-gray-400" />
                <p className="text-gray-500">Carregando itens...</p>
              </div>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <p className="text-gray-900 font-medium">Nenhum item encontrado</p>
                  <p className="text-gray-500 text-sm">
                    {filter === 'all' 
                      ? "Não há itens cadastrados no sistema."
                      : filter === 'active'
                      ? "Não há itens habilitados."
                      : "Não há itens desabilitados."
                    }
                  </p>
                </div>
              </div>
            </div>
          ) : (
            filteredItems.map((item, index) => (
              <div 
                key={index} 
                className={`border rounded-lg p-4 transition-all duration-200 ${
                  item.habilitado 
                    ? 'border-green-200 bg-green-50/30' 
                    : 'border-red-200 bg-red-50/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        item.habilitado ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        <span className={`font-semibold text-sm ${
                          item.habilitado ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.nome.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{item.nome}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-gray-500 text-sm">
                            Código: <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">{item.codigo}</span>
                          </span>
                          <Badge 
                            variant={item.disponivel ? "default" : "secondary"}
                            className={`text-xs ${
                              item.disponivel ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                            }`}
                          >
                            {item.disponivel ? 'Disponível' : 'Emprestado'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant={item.habilitado ? "default" : "secondary"}
                      className={`flex items-center gap-1 ${
                        item.habilitado ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {item.habilitado ? (
                        <>
                          <CheckCircle className="w-3 h-3" />
                          Habilitado
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3" />
                          Desabilitado
                        </>
                      )}
                    </Badge>
                    <Button 
                      variant={item.habilitado ? "destructive" : "default"}
                      size="sm"
                      onClick={() => handleStatusChange(item.codigo, !item.habilitado)}
                      disabled={changingStatus === item.codigo}
                      className="flex items-center gap-2 min-w-[120px]"
                    >
                      {changingStatus === item.codigo ? (
                        <>
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          Alterando...
                        </>
                      ) : (
                        <>
                          {item.habilitado ? (
                            <>
                              <XCircle className="w-3 h-3" />
                              Desabilitar
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-3 h-3" />
                              Habilitar
                            </>
                          )}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {filteredItems.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Mostrando {filteredItems.length} de {items.length} itens
            </p>
          </div>
        )}
      </BoxContainer>
    </section>
  );
} 