import { useQuery } from '@tanstack/react-query';
import { fetchGgrValor } from '@/service/google/ggrService';

const useGgrValor = (param: string) => {
  return useQuery<number, Error>({
    queryKey: ['ggrValor', param],
    queryFn: () => fetchGgrValor(param),
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

export default useGgrValor;