import { useSheetData, BaseRow, parseNumericValue } from '@/service/google/baseGoogleService';

interface QuantidadeFTDResult {
  data: number | null;
  isLoading: boolean;
  error: Error | null;
}

const useQuantidadeFTD = (param: string): QuantidadeFTDResult => {
  return useSheetData<BaseRow, number>(
    param,
    "FTD (Qtd)",
    (rows, operacaoNome) => {
      return rows
        .filter(row => row["Operação"]?.trim() === operacaoNome)
        .reduce((sum, row) => {
          const valueStr = row["FTD (Qtd)"]?.toString().trim() || "0";
          const value = parseNumericValue(valueStr);
          return isNaN(value) ? sum : sum + value;
        }, 0);
    }
  );
};

export default useQuantidadeFTD;