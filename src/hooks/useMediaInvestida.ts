import { useSheetData, BaseRow, parseCurrencyValue } from '@/service/google/baseGoogleService';
import useDateFilter from "@/hooks/useDateFilter";
import { useMemo } from 'react';

// Cálculo da média de investimento:
// AVG(TOTAL INVESTIDO (DIA)) - MÉDIA

interface MediaInvestidaResult {
  data: number | null;
  isLoading: boolean;
  error: Error | null;
}

const useMediaInvestida = (param: string, startingDate: Date | undefined, endingDate: Date | undefined): MediaInvestidaResult => {
  const rowsData = useSheetData<BaseRow, number>(
    param,
    "Total Investido (Dia)",
    (rows, operacaoNome) => {
      return rows.filter(row => row["Operação"]?.trim() === operacaoNome)
    }
  );

  const filteredData = useDateFilter(rowsData.data, startingDate, endingDate)?.reduce((acc, row) => {
    const valorStr = row["Total Investido (Dia)"]?.toString().trim() || "R$ 0";
    
    // Verifica se é um valor válido
    if (!valorStr || 
        valorStr === '-' || 
        valorStr === 'null' || 
        valorStr === 'undefined' || 
        valorStr === '0' || 
        valorStr === '0.00' || 
        valorStr.includes('R$ -') || 
        /^R?\$?\s*-$/.test(valorStr)) {
      return acc;
    }

    const valor = parseCurrencyValue(valorStr);
    return !isNaN(valor) && valor > 0 ? {
      soma: acc.soma + valor,
      count: acc.count + 1
    } : acc;
  }, { soma: 0, count: 0 });

  return useMemo(() => {
    if (rowsData.error) {
      return { data: null, isLoading: false, error: rowsData.error };
    }

    if (rowsData.isLoading) {
      return { data: null, isLoading: true, error: null };
    }

    if (!filteredData || filteredData.count === 0) {
      return { data: null, isLoading: false, error: null };
    }

    return {
      data: filteredData.soma / filteredData.count,
      isLoading: false,
      error: null
    };
  }, [filteredData, rowsData.error, rowsData.isLoading]);
};

export default useMediaInvestida;