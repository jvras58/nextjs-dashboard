import { buscarOperacao } from "@/utils/BuscarOperacao";

export interface BaseRow {
    "Operação": string;
    [key: string]: string;
  }
  
  export const fetchSheetData = async <T extends BaseRow>(
    param: string,
    columnName: string,
    valueTransformer: (value: string) => number
  ): Promise<number> => {
    if (!param) throw new Error("Parâmetro não fornecido");
  
    // 1. Busca o nome da operação
    const operacaoResult = await buscarOperacao(param);
    if (!operacaoResult.exists || !operacaoResult.nome) {
      throw new Error("Operação correspondente não encontrada");
    }
  
    // 2. Busca dados da planilha
    const spreadsheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_SPREADSHEET_ID;
    if (!spreadsheetId) {
      throw new Error("Spreadsheet ID is not defined");
    }
  
    const response = await fetch(`/api/sheets?spreadsheetId=${spreadsheetId}`);
    if (!response.ok) {
      throw new Error("Falha ao buscar dados da planilha");
    }
  
    // 3. Processa e retorna os dados
    const sheetData = await response.json();
    const rows = sheetData.rows as T[];
  
    return rows
      .filter(row => row["Operação"]?.trim() === operacaoResult.nome?.trim())
      .reduce((sum, row) => {
        const valueStr = row[columnName]?.toString().trim() || "0";
        const value = valueTransformer(valueStr);
        return isNaN(value) ? sum : sum + value;
      }, 0);
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