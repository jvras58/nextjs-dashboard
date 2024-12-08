import { useQuery } from '@tanstack/react-query';
import { buscarOperacao } from "@/utils/BuscarOperacao";

export interface BaseRow {
  "Operação": string;
  [key: string]: string;
}

const SHEETS_CACHE_KEY = 'sheet-data';
const OPERACAO_CACHE_KEY = 'operacao-data';

const fetchOperacao = async (param: string) => {
  const operacaoResult = await buscarOperacao(param);
  if (!operacaoResult.exists || !operacaoResult.nome) {
    throw new Error("Operação correspondente não encontrada");
  }
  return operacaoResult;
};

const fetchSheet = async () => {
  const spreadsheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!spreadsheetId) {
    throw new Error("O ID da planilha não está definido");
  }

  const response = await fetch(`/api/sheets?spreadsheetId=${spreadsheetId}`);
  if (!response.ok) {
    throw new Error("Falha ao buscar dados da planilha");
  }

  return response.json();
};

export const useSheetData = <T extends BaseRow>(
  param: string,
  columnName: string,
  valueTransformer: (value: string) => number
) => {
  // Query para operação
  const operacaoQuery = useQuery({
    queryKey: [OPERACAO_CACHE_KEY, param],
    queryFn: () => fetchOperacao(param),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  // Query para dados da planilha
  const sheetQuery = useQuery({
    queryKey: [SHEETS_CACHE_KEY],
    queryFn: fetchSheet,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  // Processa os dados
  const processData = () => {
    if (!operacaoQuery.data || !sheetQuery.data) return 0;

    const rows = sheetQuery.data.rows as T[];
    return rows
      .filter(row => row["Operação"]?.trim() === operacaoQuery.data.nome?.trim())
      .reduce((sum, row) => {
        const valueStr = row[columnName]?.toString().trim() || "0";
        const value = valueTransformer(valueStr);
        return isNaN(value) ? sum : sum + value;
      }, 0);
  };

  return {
    data: processData(),
    isLoading: operacaoQuery.isLoading || sheetQuery.isLoading,
    error: operacaoQuery.error || sheetQuery.error
  };
};

// Função helper para transformar valores monetários
export const parseCurrencyValue = (valueStr: string): number => {
  const normalizedValue = valueStr
    .replace("R$", "")
    .replace(/\s+/g, "")
    .replace(".", "")
    .replace(",", ".");
  return parseFloat(normalizedValue);
};

// Função helper para transformar valores numéricos
export const parseNumericValue = (valueStr: string): number => {
  return parseInt(valueStr, 10);
};