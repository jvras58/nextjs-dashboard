import { useQuery } from '@tanstack/react-query';
import { fetchCadastrosPorEstado } from '@/service/firestore/cadastroEstadoService';

interface Cadastro {
  id: string;
  affiliate: string;
  estado: string;
}

// Configurações base para query do Firestore
const baseQueryConfig = {
  staleTime: 2 * 60 * 60 * 1000, // 2 horas
  gcTime: 3 * 60 * 60 * 1000, // 3 horas
  retry: 3,
  retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  structuralSharing: true,
  networkMode: 'online' as const
};

const useCadastroPorEstado = (affiliate: string) => {
  const { data, isLoading, isError, error } = useQuery<Record<string, Cadastro[]>, Error>({
    queryKey: ['cadastrosPorEstado', affiliate],
    queryFn: () => fetchCadastrosPorEstado(affiliate),
    enabled: !!affiliate,
    ...baseQueryConfig
  });

  return {
    cadastrosPorEstado: data || {},
    isLoading,
    isError,
    error
  };
};

export default useCadastroPorEstado;