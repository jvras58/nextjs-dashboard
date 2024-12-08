import { useSheetData, parseCurrencyValue } from '@/service/google/baseGoogleService';

interface TotalPremiosResult {
  data: number;
  isLoading: boolean;
  error: Error | null;
}

const useTotalPremios = (param: string): TotalPremiosResult => {
  return useSheetData(param, "Total de Prêmios", parseCurrencyValue);
};

export default useTotalPremios;