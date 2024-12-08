import { useSheetData, parseCurrencyValue } from '@/service/google/baseGoogleService';

interface GgrValorResult {
  data: number;
  isLoading: boolean;
  error: Error | null;
}

const useGgrValor = (param: string): GgrValorResult => {
  return useSheetData(param, "GGR", parseCurrencyValue);
};

export default useGgrValor;