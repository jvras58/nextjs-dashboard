import { useSheetData, parseCurrencyValue } from '@/service/google/baseGoogleService';

interface TotalInvestidoResult {
  data: number;
  isLoading: boolean;
  error: Error | null;
}

const useTotalInvestido = (param: string): TotalInvestidoResult => {
  return useSheetData(param, "Total Investido (Dia)", parseCurrencyValue);
};

export default useTotalInvestido;