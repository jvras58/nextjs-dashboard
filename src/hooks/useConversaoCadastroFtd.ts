import useQuantidadeFTD from '@/hooks/useFtdQntd';
import useTotalCadastro from '@/hooks/useTotalCadastro';

// Cálculo da Conversão de Cadastro FTD:
// ftdResult(FTD (Qtd)) / cadastroResult(Cadastros)

interface ConversaoCadastroFTDResult {
  data: string | null;
  isLoading: boolean;
  error: Error | null;
}

const useConversaoCadastroFTD = (param: string): ConversaoCadastroFTDResult => {
  const ftdResult = useQuantidadeFTD(param);
  const cadastroResult = useTotalCadastro(param);

  const calcularConversao = (): string | null => {
    if (!ftdResult.data || !cadastroResult.data || cadastroResult.data === 0) {
      return null;
    }

    const taxa = ftdResult.data / cadastroResult.data;
    return `${(taxa * 100).toFixed(1)}%`;
  };

  return {
    data: calcularConversao(),
    isLoading: ftdResult.isLoading || cadastroResult.isLoading,
    error: ftdResult.error || cadastroResult.error
  };
};

export default useConversaoCadastroFTD;