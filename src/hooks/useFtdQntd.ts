import { useQuery } from '@tanstack/react-query';
import { fetchQuantidadeFTD } from '@/service/google/ftdService';

const useQuantidadeFTD = (param: string) => {
  return useQuery<number, Error>({
    queryKey: ['ftdQuantidade', param],
    queryFn: () => fetchQuantidadeFTD(param),
    enabled: !!param,
    
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
    networkMode: 'online'
  });
};

export default useQuantidadeFTD;