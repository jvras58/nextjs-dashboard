interface Row {
    "Código DDD": number;
    "Estado": string;
    [key: string]: string | number;
}

interface OperacaoResult {
    exists: boolean;
    Codigo_DDD: number | null;
    Estado: string | null;
    error?: Error | null;
}

export async function buscarOperacao(EstadoComparate: string): Promise<OperacaoResult> {
    if (!EstadoComparate) {
        return {
            exists: false,
            Codigo_DDD: null,
            Estado: null
        };
    }

    try {
        const sheetsIndex = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_OPERATIONS_SHEET_ID;
        const spreadsheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_STATES_SHEET_ID;
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
        console.log("Dados da planilha:", sheetData); // Adiciona o console.log aqui
        const rows = sheetData.rows as Row[];
        const foundRow = rows.find((row: Row) => row["Estado"]?.trim() === EstadoComparate);

        return {
            exists: !!foundRow,
            Codigo_DDD: foundRow ? foundRow["Código DDD"] : null,
            Estado: foundRow ? foundRow["Estado"] : null
        };

    } catch (err) {
        return {
            exists: false,
            Codigo_DDD: null,
            Estado: null,
            error: err instanceof Error ? err : new Error('Erro desconhecido')
        };
    }
}