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

const useCustoFTD = (param: string): CustoFTDResult => {
  const totalInvestido = useTotalInvestido(param);
  const quantidadeFTD = useQuantidadeFTD(param);

  return useMemo(() => {
    // Se estiver carregando qualquer um dos dados
    if (totalInvestido.isLoading || quantidadeFTD.isLoading) {
      return { data: null, isLoading: true, error: null };
    }

    // Se houver erro em qualquer um dos hooks
    if (totalInvestido.error || quantidadeFTD.error) {
      return {
        data: null,
        isLoading: false,
        error: totalInvestido.error || quantidadeFTD.error
      };
    }

    // Se não houver dados ou quantidade for zero
    if (!totalInvestido.data || !quantidadeFTD.data || quantidadeFTD.data === 0) {
      return { data: null, isLoading: false, error: null };
    }

    // Calcula o custo por FTD
    const custoFTD = totalInvestido.data / quantidadeFTD.data;

    return {
      data: custoFTD,
      isLoading: false,
      error: null
    };
  }, [totalInvestido, quantidadeFTD]);
};

export default useCustoFTD;