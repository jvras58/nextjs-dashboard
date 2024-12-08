import { useQuery } from '@tanstack/react-query';
import { fetchSheetData, fetchFiliadoData } from '@/service/firestore/filiadoService';

interface FiliadoData {
  id: string;
  [key: string]: any;
}

// Configurações base para queries
const baseQueryConfig = {
  staleTime: 5 * 60 * 1000,
  gcTime: 30 * 60 * 1000,
  retry: 3,
  retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
  refetchOnMount: true,
  refetchOnWindowFocus: false,
  refetchOnReconnect: true,
  structuralSharing: true,
  networkMode: 'online' as const
};

const useFiliadoListFiltered = (collectionName: string) => {
  const sheetQuery = useQuery<string[], Error>({
    queryKey: ['sheetCodes'],
    queryFn: fetchSheetData,
    ...baseQueryConfig
  });

  const filiadosQuery = useQuery<FiliadoData[], Error>({
    queryKey: ['filiados', collectionName, sheetQuery.data],
    queryFn: () => fetchFiliadoData(collectionName, sheetQuery.data || []),
    enabled: !!sheetQuery.data,
    select: (data: FiliadoData[]) => {
      return data.sort((a, b) => b.id.localeCompare(a.id));
    },
    ...baseQueryConfig
  });

  return {
    data: filiadosQuery.data || [],
    isLoading: sheetQuery.isLoading || filiadosQuery.isLoading,
    isError: sheetQuery.isError || filiadosQuery.isError,
    error: sheetQuery.error || filiadosQuery.error
  };
};

export default useFiliadoListFiltered;