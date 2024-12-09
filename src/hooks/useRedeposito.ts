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
const useTaxaRedeposito = (param: string): TaxaNaoConversaoResult => {
  const quantidadeDeposito = useQuantidadeDeposito(param);
  const quantidadeFTD = useQuantidadeFTD(param);

  return useMemo(() => {
    // Se estiver carregando qualquer um dos dados
    if (quantidadeDeposito.isLoading || quantidadeFTD.isLoading) {
      return { data: null, isLoading: true, error: null };
    }

    // Se houver erro em qualquer um dos hooks
    if (quantidadeDeposito.error || quantidadeFTD.error) {
      return {
        data: null,
        isLoading: false,
        error: quantidadeDeposito.error || quantidadeFTD.error
      };
    }

    // Se não houver dados ou quantidade de depósitos for zero
    if (!quantidadeDeposito.data || !quantidadeFTD.data || quantidadeDeposito.data === 0) {
      return { data: null, isLoading: false, error: null };
    }

    // Calcula a taxa de re-depósito
    const Convertidos = quantidadeDeposito.data - quantidadeFTD.data;
    const taxa = Convertidos / quantidadeDeposito.data;
    const taxaFormatada = `${(taxa * 100).toFixed(1)}%`;

    return {
      data: taxaFormatada,
      isLoading: false,
      error: null
    };
  }, [quantidadeDeposito, quantidadeFTD]);
};

export default useTaxaRedeposito;