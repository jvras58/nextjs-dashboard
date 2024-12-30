import useGgrValor from '@/hooks/useGgrValor';
import useDepositoValor from '@/hooks/useDepositoValorQntd';

// Cálculo do TAXA DE RETENÇÃO DE DEPÓSITO:
// ggrResult(GGR) / depositoResult(Depósitos (Valor))

interface TaxaRetencaoDepositoResult {
  data: string | null;
  isLoading: boolean;
  error: Error | null;
}

const useTaxaRetencaoDeposito = (param: string, startingDate: Date | undefined, endingDate: Date | undefined) => {
  const [ggrResult, ggrIsLoading, ggrError] = useGgrValor(param, startingDate, endingDate);
  const [depositoResult, depositoIsLoading, depositoError] = useDepositoValor(param, startingDate, endingDate);

  const calcularTaxaRetencao = (): string | null => {
    if (!ggrResult || !depositoResult || depositoResult === 0) {
      return null;
    }

    const taxa = ggrResult / depositoResult;
    return `${(taxa * 100).toFixed(1)}%`;
  };

  return {
    data: calcularTaxaRetencao(),
    isLoading: ggrIsLoading || depositoIsLoading,
    error: ggrError || depositoError
  };
};

export default useTaxaRetencaoDeposito;