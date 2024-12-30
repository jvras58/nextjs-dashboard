import { useMemo } from 'react';
import useFtdAmount from '@/hooks/useFtdAmount';
import useQuantidadeFTD from '@/hooks/useFtdQntd';

// Cálculo do Valor Médio por FTD:
// ftdAmount(FTD (Valor)) / quantidadeFTD(FTD (Qtd))

interface ValorMedioFTDResult {
  data: number | null;
  isLoading: boolean;
  error: Error | null;
}

const useValorMedioFTD = (param: string, startingDate: Date | undefined, endingDate: Date | undefined) => {
  const [ftdAmount, ftdIsLoading, ftdError] = useFtdAmount(param, startingDate, endingDate);
  const [quantidadeFTD, quantidadeIsLoading, quantidadeError] = useQuantidadeFTD(param, startingDate, endingDate);

  return useMemo(() => {
    // Se estiver carregando qualquer um dos dados
    if (ftdIsLoading || quantidadeIsLoading) {
      return { data: null, isLoading: true, error: null };
    }

    // Se houver erro em qualquer um dos hooks
    if (ftdError || quantidadeError) {
      return {
        data: null,
        isLoading: false,
        error: ftdError || quantidadeError
      };
    }

    // Se não houver dados ou quantidade for zero
    if (!ftdAmount || !quantidadeFTD || quantidadeFTD === 0) {
      return { data: null, isLoading: false, error: null };
    }

    // Calcula o valor médio por FTD
    const valorMedio = ftdAmount / quantidadeFTD;

    return {
      data: valorMedio,
      isLoading: false,
      error: null
    };
  }, [ftdAmount, ftdError, ftdIsLoading, quantidadeError, quantidadeFTD, quantidadeIsLoading]);
};

export default useValorMedioFTD;