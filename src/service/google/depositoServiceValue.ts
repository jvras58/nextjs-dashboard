import { buscarOperacao } from "@/utils/BuscarOperacao";

interface Row {
  "Operação": string;
  "Depósitos (Valor)": string;
  [key: string]: string;
}

interface OperacaoResult {
  exists: boolean;
  nome: string | null;
}

export const fetchDepositoValor = async (param: string): Promise<number> => {
  if (!param) throw new Error("Parâmetro não fornecido");

  // 1. Busca o nome da operação
  const operacaoResult = await buscarOperacao(param) as OperacaoResult;
  if (!operacaoResult.exists || !operacaoResult.nome) {
    throw new Error("Operação correspondente não encontrada");
  }

  const operacaoNome = operacaoResult.nome;

  // 2. Busca dados da planilha
  const spreadsheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!spreadsheetId) {
    throw new Error("Spreadsheet ID is not defined");
  }

  const response = await fetch(`/api/sheets?spreadsheetId=${spreadsheetId}`);
  if (!response.ok) {
    throw new Error("Falha ao buscar dados da planilha");
  }

  const sheetData = await response.json();
  const rows = sheetData.rows as Row[];

  // 3. Calcula total
  return rows
    .filter(row => row["Operação"]?.trim() === operacaoNome.trim())
    .reduce((sum, row) => {
      const valueStr = row["Depósitos (Valor)"]?.toString().trim() || "0";
      const normalizedValue = valueStr
        .replace("R$", "")
        .replace(/\s+/g, "")
        .replace(".", "")
        .replace(",", ".");
      const value = parseFloat(normalizedValue);
      
      if (isNaN(value)) {
        console.warn(`Valor inválido encontrado: ${valueStr}`);
        return sum;
      }

      return sum + value;
    }, 0);
};