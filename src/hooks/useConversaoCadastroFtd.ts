import useQuantidadeFTD from '@/hooks/useFtdQntd';
import useTotalCadastro from '@/hooks/useTotalCadastro';

// Cálculo da Conversão de Cadastro FTD:
// ftdResult(FTD (Qtd)) / cadastroResult(Cadastros)

interface ConversaoCadastroFTDResult {
  data: string | null;
  isLoading: boolean;
  error: Error | null;
}

const useConversaoCadastroFTD = (param: string, startingDate: Date | undefined, endingDate: Date | undefined): ConversaoCadastroFTDResult => {
  const [ftdResult, ftdIsLoading, ftdError] = useQuantidadeFTD(param, startingDate, endingDate);
  const [cadastroResult, cadastroIsLoading, cadastroError] = useTotalCadastro(param, startingDate, endingDate);

  const calcularConversao = (): string | null => {
    if (!ftdResult || !cadastroResult || cadastroResult === 0) {
      return null;
    }

    const taxa = ftdResult / cadastroResult;
    return `${(taxa * 100).toFixed(1)}%`;
  };

  return {
    data: calcularConversao(),
    isLoading: ftdIsLoading || cadastroIsLoading,
    error: ftdError || cadastroError
  };
};

export default useConversaoCadastroFTD;