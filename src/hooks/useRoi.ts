import useTotalInvestido from '@/hooks/useTotalInvestido';
import useDepositoValor from '@/hooks/useDepositoValorQntd';

// Cálculo do ROI:
// totalInvestido(Total Investido (Dia)) / depositoValor(Depósitos (Valor)

interface RoiResult {
  data: number | null;
  isLoading: boolean;
  error: Error | null;
}

const useRoi = (param: string): RoiResult => {
  const totalInvestido = useTotalInvestido(param);
  const depositoValor = useDepositoValor(param);

  if (totalInvestido.error) return { data: null, isLoading: false, error: totalInvestido.error };
  if (depositoValor.error) return { data: null, isLoading: false, error: depositoValor.error };
  
  if (totalInvestido.isLoading || depositoValor.isLoading) {
    return { data: null, isLoading: true, error: null };
  }

  if (!totalInvestido.data || !depositoValor.data || depositoValor.data === 0) {
    return { data: null, isLoading: false, error: null };
  }

  const roi = totalInvestido.data / depositoValor.data;
  return { data: roi, isLoading: false, error: null };
};

export default useRoi;