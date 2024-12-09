import { useSheetData, BaseRow, parseCurrencyValue } from '@/service/google/baseGoogleService';

interface TotalApostadoResult {
  data: number | null;
  isLoading: boolean;
  error: Error | null;
}

const useTotalApostado = (param: string): TotalApostadoResult => {
  return useSheetData<BaseRow, number>(
    param,
    "Total Apostado",
    (rows, operacaoNome) => {
      return rows
        .filter(row => row["Operação"]?.trim() === operacaoNome)
        .reduce((sum, row) => {
          const valueStr = row["Total Apostado"]?.toString().trim() || "R$ 0";
          const value = parseCurrencyValue(valueStr);
          return isNaN(value) ? sum : sum + value;
        }, 0);
    }
  );
};

export default useTotalApostado;