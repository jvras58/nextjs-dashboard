import { useSheetData, parseNumericValue } from '@/service/google/baseGoogleService';

interface QuantidadeFTDResult {
  data: number;
  isLoading: boolean;
  error: Error | null;
}

const useQuantidadeFTD = (param: string): QuantidadeFTDResult => {
  return useSheetData(param, "FTD (Qtd)", parseNumericValue);
};

export default useQuantidadeFTD;