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


export interface SheetRow extends BaseRow {
  "Operação": string;
  [key: string]: string;
}

export type ProcessedDataType = number | string | boolean | null;


export const useSheetData = <
  RowType extends SheetRow = SheetRow,
  ReturnType extends ProcessedDataType = number
>(
  param: string,
  _columnName: string,
  processRows: (rows: RowType[], operacaoNome: string) => ReturnType
) => {
  // Query para operação
  const operacaoQuery = useQuery({
    queryKey: [OPERACAO_CACHE_KEY, param],
    queryFn: () => fetchOperacao(param),
  });

  // Query para dados da planilha
  const sheetQuery = useQuery({
    queryKey: [SHEETS_CACHE_KEY],
    queryFn: fetchSheet,
  });

  const processData = (): ReturnType | null => {
    if (!operacaoQuery.data || !sheetQuery.data) return null;

    const rows = sheetQuery.data.rows as RowType[];
    return processRows(rows, operacaoQuery.data.nome?.trim() || '');
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

// Helper para processar valores percentuais
export const parsePercentageValue = (valueStr: string): number => {
  return parseFloat(valueStr.replace("%", "")) / 100;
};