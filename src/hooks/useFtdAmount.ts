import { useSheetData, BaseRow, parseCurrencyValue } from '@/service/google/baseGoogleService';

interface DepositoValorResult {
  data: number | null;
  isLoading: boolean;
  error: Error | null;
}

const useFtdAmount = (param: string): DepositoValorResult => {
  return useSheetData<BaseRow, number>(
    param,
    "FTD (Valor)",
    (rows, operacaoNome) => {
      return rows
        .filter(row => row["Operação"]?.trim() === operacaoNome)
        .reduce((sum, row) => {
          const valueStr = row["FTD (Valor)"]?.toString().trim() || "R$ 0";
          const value = parseCurrencyValue(valueStr);
          return isNaN(value) ? sum : sum + value;
        }, 0);
    }
  );
};

export default useFtdAmount;