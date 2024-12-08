import { useSheetData, parseCurrencyValue } from '@/service/google/baseGoogleService';

interface DepositoValorResult {
  data: number;
  isLoading: boolean;
  error: Error | null;
}

const useDepositoValor = (param: string): DepositoValorResult => {
  return useSheetData(param, "Depósitos (Valor)", parseCurrencyValue);
};

export default useDepositoValor;