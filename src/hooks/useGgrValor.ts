import { useSheetData, BaseRow, parseCurrencyValue } from '@/service/google/baseGoogleService';

interface GgrValorResult {
  data: number | null;
  isLoading: boolean;
  error: Error | null;
}

const useGgrValor = (param: string): GgrValorResult => {
  return useSheetData<BaseRow, number>(
    param,
    "GGR",
    (rows, operacaoNome) => {
      return rows
        .filter(row => row["Operação"]?.trim() === operacaoNome)
        .reduce((sum, row) => {
          const valueStr = row["GGR"]?.toString().trim() || "R$ 0";
          const value = parseCurrencyValue(valueStr);
          return isNaN(value) ? sum : sum + value;
        }, 0);
    }
  );
};

export default useGgrValor;