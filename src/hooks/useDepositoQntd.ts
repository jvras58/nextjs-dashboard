import { useSheetData, parseNumericValue } from '@/service/google/baseGoogleService';

interface DepositoQuantidadeResult {
  data: number;
  isLoading: boolean;
  error: Error | null;
}

const useQuantidadeDeposito = (param: string): DepositoQuantidadeResult => {
  return useSheetData(param, "Depósitos (Qtd)", parseNumericValue);
};

export default useQuantidadeDeposito;