interface Row {
"Código": string;
"Nome": string;
[key: string]: string;
}

interface OperacaoResult {
exists: boolean;
nome: string | null;
codigo: string | null;
error?: Error | null;
}

export async function buscarOperacao(param: string): Promise<OperacaoResult> {
if (!param) {
return {
    exists: false,
    nome: null,
    codigo: null
};
}

try {
const sheetsIndex = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_OPERATIONS_SHEET_ID;
const spreadsheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_SPREADSHEET_ID;
if (!spreadsheetId) {
    throw new Error("O ID da planilha não está definido");
}

// Usa a API Route para buscar os dados
const response = await fetch(
    `/api/sheets?spreadsheetId=${spreadsheetId}&sheetIndex=${sheetsIndex}`
    );

if (!response.ok) {
    throw new Error("Falha ao buscar dados da planilha");
    }

const sheetData = await response.json();
const rows = sheetData.rows as Row[];
const foundRow = rows.find((row: Row) => row["Código"]?.trim() === param);

return {
    exists: !!foundRow,
    nome: foundRow ? foundRow["Nome"] : null,
    codigo: foundRow ? foundRow["Código"] : null
};

} catch (err) {
return {
    exists: false,
    nome: null,
    codigo: null,
    error: err instanceof Error ? err : new Error('Erro desconhecido')
};
}
}