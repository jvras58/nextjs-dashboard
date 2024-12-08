import { useSheetData, parseCurrencyValue } from '@/service/google/baseGoogleService';

interface TotalApostadoResult {
  data: number;
  isLoading: boolean;
  error: Error | null;
}

const useTotalApostado = (param: string): TotalApostadoResult => {
  return useSheetData(param, "Total Apostado", parseCurrencyValue);
};

export default useTotalApostado;