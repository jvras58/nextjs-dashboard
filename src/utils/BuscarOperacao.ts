import getDocs from "@/actions/spreadsheets-actions/getDocs";

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
const spreadsheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_SPREADSHEET_ID;
if (!spreadsheetId) {
    throw new Error("Spreadsheet ID is not defined");
}

const response = await getDocs(spreadsheetId, 1);

if (!response || !response.headers || !response.rows) {
    throw new Error("Dados da planilha não encontrados");
}

const rows = response.rows as Row[];
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