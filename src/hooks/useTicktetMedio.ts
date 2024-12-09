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

const useTicketMedio = (param: string): TicketMedioResult => {
  const depositoValor = useDepositoValor(param);
  const quantidadeFTD = useQuantidadeFTD(param);

  return useMemo(() => {
    // Se estiver carregando qualquer um dos dados
    if (depositoValor.isLoading || quantidadeFTD.isLoading) {
      return { data: null, isLoading: true, error: null };
    }

    // Se houver erro em qualquer um dos hooks
    if (depositoValor.error || quantidadeFTD.error) {
      return {
        data: null,
        isLoading: false,
        error: depositoValor.error || quantidadeFTD.error
      };
    }

    // Se não houver dados ou quantidade de FTDs for zero
    if (!depositoValor.data || !quantidadeFTD.data || quantidadeFTD.data === 0) {
      return { data: null, isLoading: false, error: null };
    }

    // Calcula o ticket médio por FTD
    const ticketMedio = depositoValor.data / quantidadeFTD.data;

    return {
      data: ticketMedio,
      isLoading: false,
      error: null
    };
  }, [depositoValor, quantidadeFTD]);
};

export default useTicketMedio;