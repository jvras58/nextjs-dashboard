import { useQuery } from '@tanstack/react-query';
import { fetchSheetData, fetchFiliadoData } from '@/service/firestore/filiadoService';

interface FiliadoData {
  id: string;
  [key: string]: any;
}

const useFiliadoListFiltered = (collectionName: string) => {
  // Query para dados da planilha
  const sheetQuery = useQuery<string[], Error>({
    queryKey: ['sheetCodes'],
    queryFn: fetchSheetData,
    
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

  // Query para dados dos filiados
  const filiadosQuery = useQuery<FiliadoData[], Error>({
    queryKey: ['filiados', collectionName, sheetQuery.data],
    queryFn: () => fetchFiliadoData(collectionName, sheetQuery.data || []),
    enabled: !!sheetQuery.data,
    
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
    
    // Select para transformação de dados
    select: (data: FiliadoData[]) => {
      return data.sort((a, b) => b.id.localeCompare(a.id));
    }
  });

  return {
    data: filiadosQuery.data || [],
    isLoading: sheetQuery.isLoading || filiadosQuery.isLoading,
    isError: sheetQuery.isError || filiadosQuery.isError,
    error: sheetQuery.error || filiadosQuery.error
  };
};

export default useFiliadoListFiltered;