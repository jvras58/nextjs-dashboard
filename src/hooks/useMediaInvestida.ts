import { useSheetData, BaseRow, parseCurrencyValue } from '@/service/google/baseGoogleService';


// Cálculo da média de investimento:
// AVG(TOTAL INVESTIDO (DIA)) - MÉDIA

interface MediaInvestidaResult {
  data: number | null;
  isLoading: boolean;
  error: Error | null;
}

const useMediaInvestida = (operacaoNome: string): MediaInvestidaResult => {
  return useSheetData<BaseRow, number>(
    operacaoNome,
    "Total Investido (Dia)",
    calcularMediaInvestimento
  );
};

const calcularMediaInvestimento = (rows: BaseRow[], operacaoNome: string): number => {
  const rowsFiltradas = filtrarPorOperacao(rows, operacaoNome);
  
  if (rowsFiltradas.length === 0) {
    return 0;
  }

  const { totalInvestido, quantidadeRegistros } = calcularTotais(rowsFiltradas);

  return calcularMedia(totalInvestido, quantidadeRegistros);
};

const filtrarPorOperacao = (rows: BaseRow[], operacaoNome: string): BaseRow[] => {
  return rows.filter(row => row["Operação"]?.trim() === operacaoNome);
};

const calcularTotais = (rows: BaseRow[]) => {
  return rows.reduce((acumulador, row) => {
    const valorStr = row["Total Investido (Dia)"]?.toString().trim() || "R$ 0";
    const valor = parseCurrencyValue(valorStr);
    
    if (!isNaN(valor)) {
      return {
        totalInvestido: acumulador.totalInvestido + valor,
        quantidadeRegistros: acumulador.quantidadeRegistros + 1
      };
    }
    return acumulador;
  }, { totalInvestido: 0, quantidadeRegistros: 0 });
};

const calcularMedia = (total: number, quantidade: number): number => {
  return quantidade > 0 ? total / quantidade : 0;
};

export default useMediaInvestida;