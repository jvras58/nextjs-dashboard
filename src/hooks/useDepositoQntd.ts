import { useSheetData, BaseRow, parseNumericValue } from '@/service/google/baseGoogleService';

interface DepositoQuantidadeResult {
  data: number | null;
  isLoading: boolean;
  error: Error | null;
}

const useQuantidadeDeposito = (param: string): DepositoQuantidadeResult => {
  return useSheetData<BaseRow, number>(
    param,
    "Depósitos (Qtd)",
    (rows, operacaoNome) => {
      return rows
        .filter(row => row["Operação"]?.trim() === operacaoNome)
        .reduce((sum, row) => {
          const valueStr = row["Depósitos (Qtd)"]?.toString().trim() || "0";
          const value = parseNumericValue(valueStr);
          return isNaN(value) ? sum : sum + value;
        }, 0);
    }
  );
};

export default useQuantidadeDeposito;