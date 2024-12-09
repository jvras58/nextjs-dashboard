import { useSheetData, BaseRow, parseCurrencyValue } from '@/service/google/baseGoogleService';

interface MediaInvestidaResult {
  data: number | null;
  isLoading: boolean;
  error: Error | null;
}

const useMediaInvestida = (param: string): MediaInvestidaResult => {
  return useSheetData<BaseRow, number>(
    param,
    "Total Investido (Dia)",
    (rows, operacaoNome) => {
      const filteredRows = rows.filter(row => row["Operação"]?.trim() === operacaoNome);
      
      if (filteredRows.length === 0) return 0;

      const { sum, count } = filteredRows.reduce((acc, row) => {
        const valueStr = row["Total Investido (Dia)"]?.toString().trim() || "R$ 0";
        const value = parseCurrencyValue(valueStr);
        
        if (!isNaN(value)) {
          return {
            sum: acc.sum + value,
            count: acc.count + 1
          };
        }
        return acc;
      }, { sum: 0, count: 0 });

      return count > 0 ? sum / count : 0;
    }
  );
};

export default useMediaInvestida;