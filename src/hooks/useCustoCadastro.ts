import useTotalInvestido from '@/hooks/useTotalInvestido';
import useTotalCadastro from '@/hooks/useTotalCadastro';

interface CustoCadastroResult {
  data: number | null;
  isLoading: boolean;
  error: Error | null;
}

const useCustoCadastro = (param: string): CustoCadastroResult => {
  const totalInvestido = useTotalInvestido(param);
  const totalCadastro = useTotalCadastro(param);

  if (totalInvestido.error || totalCadastro.error) {
    return {
      data: null,
      isLoading: false,
      error: totalInvestido.error || totalCadastro.error
    };
  }

  if (totalInvestido.isLoading || totalCadastro.isLoading) {
    return {
      data: null,
      isLoading: true,
      error: null
    };
  }

  if (!totalInvestido.data || !totalCadastro.data || totalCadastro.data === 0) {
    return {
      data: null,
      isLoading: false,
      error: null
    };
  }

  return {
    data: totalInvestido.data / totalCadastro.data,
    isLoading: false,
    error: null
  };
};

export default useCustoCadastro;