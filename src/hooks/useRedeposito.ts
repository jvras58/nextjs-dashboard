import { useMemo } from 'react';
import useQuantidadeDeposito from '@/hooks/useDepositoQntd';
import useQuantidadeFTD from '@/hooks/useFtdQntd';

// Cálculo da Taxa de Re-depósito:
// quantidadeDeposito(Depósitos (Qtd)) - quantidadeFTD(FTD (Qtd)) / quantidadeDeposito(Depósitos (Qtd))

interface TaxaNaoConversaoResult {
  data: string | null;
  isLoading: boolean;
  error: Error | null;
}
//Taxa de Re-depósito
const useTaxaRedeposito = (param: string, startingDate: Date | undefined, endingDate: Date | undefined) => {
  const [quantidadeDeposito, depositoIsLoading, depositoError] = useQuantidadeDeposito(param, startingDate, endingDate);
  const [quantidadeFTD, FTDIsLoading, FTDError] = useQuantidadeFTD(param, startingDate, endingDate);

  return useMemo(() => {
    // Se estiver carregando qualquer um dos dados
    if (depositoIsLoading || FTDIsLoading) {
      return { data: null, isLoading: true, error: null };
    }

    // Se houver erro em qualquer um dos hooks
    if (depositoError || FTDError) {
      return {
        data: null,
        isLoading: false,
        error: depositoError || FTDError
      };
    }

    // Se não houver dados ou quantidade de depósitos for zero
    if (!quantidadeDeposito || !quantidadeFTD || quantidadeDeposito === 0) {
      return { data: null, isLoading: false, error: null };
    }

    // Calcula a taxa de re-depósito
    const Convertidos = quantidadeDeposito - quantidadeFTD;
    const taxa = Convertidos / quantidadeDeposito;
    const taxaFormatada = `${(taxa * 100).toFixed(1)}%`;

    return {
      data: taxaFormatada,
      isLoading: false,
      error: null
    };
  }, [FTDError, FTDIsLoading, depositoError, depositoIsLoading, quantidadeDeposito, quantidadeFTD]);
};

export default useTaxaRedeposito;