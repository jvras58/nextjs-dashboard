import { useQuery } from '@tanstack/react-query';
import { fetchDepositoData } from '@/service/firestore/DepositoService';

interface DepositoData {
  nome_Campanha_deposito: string;
  ftd: number;
  ftd_amount: number;
  transaction_value_quantidade: number;
  transaction_value: number;
}

const useDepositoData = (affiliate: string) => {
  return useQuery<DepositoData[], Error>({
    queryKey: ['depositos', affiliate],
    queryFn: () => fetchDepositoData(affiliate),
    
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
    
    // Ordenação por valor de transação
    select: (data: DepositoData[]) => {
      return data.sort((a, b) => b.transaction_value - a.transaction_value);
    }
  });
};

export default useDepositoData;