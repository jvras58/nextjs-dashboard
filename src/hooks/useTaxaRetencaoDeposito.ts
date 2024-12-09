import useGgrValor from '@/hooks/useGgrValor';
import useDepositoValor from '@/hooks/useDepositoValorQntd';

interface TaxaRetencaoDepositoResult {
  data: string | null;
  isLoading: boolean;
  error: Error | null;
}

const useTaxaRetencaoDeposito = (param: string): TaxaRetencaoDepositoResult => {
  const ggrResult = useGgrValor(param);
  const depositoResult = useDepositoValor(param);

  const calcularTaxaRetencao = (): string | null => {
    if (!ggrResult.data || !depositoResult.data || depositoResult.data === 0) {
      return null;
    }

    const taxa = ggrResult.data / depositoResult.data;
    return `${(taxa * 100).toFixed(1)}%`;
  };

  return {
    data: calcularTaxaRetencao(),
    isLoading: ggrResult.isLoading || depositoResult.isLoading,
    error: ggrResult.error || depositoResult.error
  };
};

export default useTaxaRetencaoDeposito;