import { useSheetData, BaseRow, parseCurrencyValue } from '@/service/google/baseGoogleService';
import useDateFilter from "@/hooks/useDateFilter";

interface DepositoValorResult {
  data: number | null;
  isLoading: boolean;
  error: Error | null;
}

const useDepositoValor = (param: string, startingDate: Date | undefined, endingDate: Date | undefined) => {
  const rowsData =  useSheetData<BaseRow, number>(
    param,
    "Depósitos (Valor)",
    (rows, operacaoNome) => {
      return rows
        .filter(row => row["Operação"]?.trim() === operacaoNome)
    }
  );
  const filteredData = useDateFilter(rowsData.data, startingDate, endingDate)?.reduce((sum, row)=> {
    const valueStr = row["Depósitos (Valor)"]?.toString().trim() || "R$ 0";
    const value = parseCurrencyValue(valueStr);
    return isNaN(value) ? sum : sum + value
  }, 0)
  return [filteredData, rowsData.isLoading, rowsData.error] as const
};

export default useDepositoValor;