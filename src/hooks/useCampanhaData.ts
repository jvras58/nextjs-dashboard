import { useQuery } from '@tanstack/react-query';
import { fetchCampanhaData } from '@/service/firestore/campanhaService';

interface CampanhaData {
  nome_campanha: string;
  quantidade_de_cadastro: number;
}

const useCampanhaData = (affiliate: string) => {
  return useQuery<CampanhaData[], Error>({
    queryKey: ['campanhas', affiliate],
    queryFn: () => fetchCampanhaData(affiliate),
    
    // Configurações de cache
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    
    // Configurações de retry
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    
    // Configurações de refetch
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    
    // Otimizações
    structuralSharing: true,
    
    // Configurações de rede
    networkMode: 'online',
    
    // Ordenação por quantidade de cadastros (opcional)
    select: (data: CampanhaData[]) => {
      return data.sort((a, b) => b.quantidade_de_cadastro - a.quantidade_de_cadastro);
    }
  });
};

export default useCampanhaData;