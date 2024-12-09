import { useSheetData, BaseRow, parseCurrencyValue } from '@/service/google/baseGoogleService';

interface TotalInvestidoResult {
  data: number | null;
  isLoading: boolean;
  error: Error | null;
}

const useTotalInvestido = (param: string): TotalInvestidoResult => {
  return useSheetData<BaseRow, number>(
    param,
    "Total Investido (Dia)",
    (rows, operacaoNome) => {
      return rows
        .filter(row => row["Operação"]?.trim() === operacaoNome)
        .reduce((sum, row) => {
          const valueStr = row["Total Investido (Dia)"]?.toString().trim() || "R$ 0";
          const value = parseCurrencyValue(valueStr);
          return isNaN(value) ? sum : sum + value;
        }, 0);
    }
  );
};

export default useTotalInvestido;