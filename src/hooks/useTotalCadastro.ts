import { useSheetData, BaseRow, parseNumericValue } from '@/service/google/baseGoogleService';

interface TotalInvestidoResult {
  data: number | null;
  isLoading: boolean;
  error: Error | null;
}

const useTotalCadastro = (param: string): TotalInvestidoResult => {
  return useSheetData<BaseRow, number>(
    param,
    "Cadastros",
    (rows, operacaoNome) => {
      return rows
        .filter(row => row["Operação"]?.trim() === operacaoNome)
        .reduce((sum, row) => {
          const valueStr = row["Cadastros"]?.toString().trim() || "0";
          const value = parseNumericValue(valueStr);
          return isNaN(value) ? sum : sum + value;
        }, 0);
    }
  );
};

export default useTotalCadastro;