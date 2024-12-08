import { useQuery } from '@tanstack/react-query';
import { fetchCadastroData } from '@/service/firestore/cadastroService';

interface CadastroData {
  id: string;
  [key: string]: any;
}

const useCadastroData = (collectionName: string, affiliate: string) => {
  return useQuery<CadastroData[], Error>({
    queryKey: ['cadastro', collectionName, affiliate],
    queryFn: () => fetchCadastroData(collectionName, affiliate),
    
    // Configurações de cache
    staleTime: 5 * 60 * 1000, // Dados considerados obsoletos após 5 minutos
    gcTime: 30 * 60 * 1000,   // Manter em cache por 30 minutos
    
    // Configurações de retry
    retry: 3,                  // Tentar 3 vezes em caso de erro
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    
    // Configurações de refetch
    refetchOnMount: true,      // Refetch ao montar o componente
    refetchOnWindowFocus: false, // Não refetch ao focar janela
    refetchOnReconnect: true,  // Refetch ao reconectar
    
    // Otimizações
    structuralSharing: true,   // Manter referências de dados inalterados
    
    // Configurações de rede
    networkMode: 'online',     // Só busca quando online
    
    // Select para transformação de dados (opcional)
    select: (data: CadastroData[]) => {
      return data.sort((a, b) => b.id.localeCompare(a.id));
    }
  });
};

export default useCadastroData;