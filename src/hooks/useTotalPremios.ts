import { useSheetData, BaseRow, parseCurrencyValue } from '@/service/google/baseGoogleService';

interface TotalPremiosResult {
  data: number | null;
  isLoading: boolean;
  error: Error | null;
}

const useTotalPremios = (param: string): TotalPremiosResult => {
  return useSheetData<BaseRow, number>(
    param,
    "Total de Prêmios",
    (rows, operacaoNome) => {
      return rows
        .filter(row => row["Operação"]?.trim() === operacaoNome)
        .reduce((sum, row) => {
          const valueStr = row["Total de Prêmios"]?.toString().trim() || "R$ 0";
          const value = parseCurrencyValue(valueStr);
          return isNaN(value) ? sum : sum + value;
        }, 0);
    }
  );
};

export default useTotalPremios;