import { useMemo } from 'react';
import useTotalInvestido from '@/hooks/useTotalInvestido';
import useQuantidadeFTD from '@/hooks/useFtdQntd';


// Cálculo do CUSTO POR FTD:
// totalInvestido(Total Investido (Dia)) / quantidadeFTD(FTD (Qtd))

interface CustoFTDResult {
  data: number | null;
  isLoading: boolean;
  error: Error | null;
}

const useCustoFTD = (param: string, startingDate: Date | undefined, endingDate: Date | undefined) => {
  const [totalInvestido, totalIsLoading, totalError] = useTotalInvestido(param, startingDate, endingDate);
  const [quantidadeFTD, FTDIsLoading, FTDError] = useQuantidadeFTD(param, startingDate, endingDate);

  return useMemo(() => {
    // Se estiver carregando qualquer um dos dados
    if (totalIsLoading || FTDIsLoading) {
      return { data: null, isLoading: true, error: null };
    }

    // Se houver erro em qualquer um dos hooks
    if (totalError || FTDError) {
      return {
        data: null,
        isLoading: false,
        error: totalError || FTDError
      };
    }

    // Se não houver dados ou quantidade for zero
    if (!totalInvestido || !quantidadeFTD || quantidadeFTD === 0) {
      return { data: null, isLoading: false, error: null };
    }

    // Calcula o custo por FTD
    const custoFTD = totalInvestido / quantidadeFTD;

    return {
      data: custoFTD,
      isLoading: false,
      error: null
    };
  }, [totalInvestido, quantidadeFTD]);
};

export default useCustoFTD;