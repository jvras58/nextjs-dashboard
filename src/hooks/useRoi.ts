import useTotalInvestido from '@/hooks/useTotalInvestido';
import useDepositoValor from '@/hooks/useDepositoValorQntd';

// Cálculo do ROI:
//  depositoValor(Depósitos (Valor)) / totalInvestido(Total Investido (Dia))

interface RoiResult {
  data: number | null;
  isLoading: boolean;
  error: Error | null;
}

const useRoi = (param: string, startingData: Date | undefined, endingData: Date | undefined): RoiResult => {
  const [totalInvestido, totalIsLoading, totalError] = useTotalInvestido(param, startingData, endingData);
  const [depositoValor, depositoIsLoading, depositoError] = useDepositoValor(param, startingData, endingData);

  if (totalError) return { data: null, isLoading: false, error: totalError };
  if (depositoError) return { data: null, isLoading: false, error: depositoError };
  
  if (totalIsLoading || depositoIsLoading) {
    return { data: null, isLoading: true, error: null };
  }

  if (!totalInvestido || !depositoValor || depositoValor === 0) {
    return { data: null, isLoading: false, error: null };
  }

  const roi = depositoValor / totalInvestido;
  return { data: roi, isLoading: false, error: null };
};

export default useRoi;