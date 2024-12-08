import { useSheetData, parseNumericValue } from '@/service/google/baseGoogleService';

interface FtdAmountResult {
  data: number;
  isLoading: boolean;
  error: Error | null;
}

const useFtdAmount = (param: string): FtdAmountResult => {
  return useSheetData(param, "FTD (Qtd)", parseNumericValue);
};

export default useFtdAmount;