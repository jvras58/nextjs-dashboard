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

const useValorMedioFTD = (param: string): ValorMedioFTDResult => {
  const ftdAmount = useFtdAmount(param);
  const quantidadeFTD = useQuantidadeFTD(param);

  return useMemo(() => {
    // Se estiver carregando qualquer um dos dados
    if (ftdAmount.isLoading || quantidadeFTD.isLoading) {
      return { data: null, isLoading: true, error: null };
    }

    // Se houver erro em qualquer um dos hooks
    if (ftdAmount.error || quantidadeFTD.error) {
      return {
        data: null,
        isLoading: false,
        error: ftdAmount.error || quantidadeFTD.error
      };
    }

    // Se não houver dados ou quantidade for zero
    if (!ftdAmount.data || !quantidadeFTD.data || quantidadeFTD.data === 0) {
      return { data: null, isLoading: false, error: null };
    }

    // Calcula o valor médio por FTD
    const valorMedio = ftdAmount.data / quantidadeFTD.data;

    return {
      data: valorMedio,
      isLoading: false,
      error: null
    };
  }, [ftdAmount, quantidadeFTD]);
};

export default useValorMedioFTD;