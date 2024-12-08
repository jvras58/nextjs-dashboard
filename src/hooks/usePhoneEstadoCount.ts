import { useQuery } from '@tanstack/react-query';
import { fetchCadastrosPorEstado } from '@/service/firestore/cadastroEstadoService';

interface Cadastro {
  id: string;
  affiliate: string;
  estado: string;
}

// Configurações base para query do Firestore
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