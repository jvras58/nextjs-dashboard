import { useMemo } from 'react';
import useDepositoValor from '@/hooks/useDepositoValorQntd';
import useQuantidadeFTD from '@/hooks/useFtdQntd';

// Cálculo do Ticket Médio GERAL:
// depositoValor(Depósitos (Valor)) / quantidadeFTD(FTD (Qtd))

interface TicketMedioResult {
  data: number | null;
  isLoading: boolean;
  error: Error | null;
}

const useTicketMedio = (param: string, startingDate: Date | undefined, endingDate: Date | undefined) => {
  const [depositoValor, depositoIsLoading, depositoError] = useDepositoValor(param, startingDate, endingDate);
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

    // Se não houver dados ou quantidade de FTDs for zero
    if (!depositoValor || !quantidadeFTD || quantidadeFTD === 0) {
      return { data: null, isLoading: false, error: null };
    }

    // Calcula o ticket médio por FTD
    const ticketMedio = depositoValor / quantidadeFTD;

    return {
      data: ticketMedio,
      isLoading: false,
      error: null
    };
  }, [depositoValor, quantidadeFTD]);
};

export default useTicketMedio;