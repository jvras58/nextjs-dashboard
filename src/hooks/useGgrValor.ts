import { useState, useEffect } from "react";
import getDocs from "@/actions/spreadsheets-actions/getDocs";

interface Row {
"Operação": string;
"GGR": string;
[key: string]: string;
}

interface UseGgrValorReturn {
data: number | null;
loading: boolean;
error: Error | null;
}

export default function useGgrValor(param: string): UseGgrValorReturn {
const [data, setData] = useState<number | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<Error | null>(null);

useEffect(() => {
    let isMounted = true;

    async function fetchData() {
    if (!param) return;
    
    console.log('🔍 Parâmetro recebido:', param); // Log do parâmetro
    
    setLoading(true);
    setError(null);

    try {
        const spreadsheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_SPREADSHEET_ID;
        if (!spreadsheetId) {
            throw new Error("Spreadsheet ID is not defined");
        }
        const response = await getDocs(spreadsheetId);
        console.log('📊 Resposta da API:', response); // Log da resposta

        if (!response.headers || !response.rows) {
        throw new Error("Dados da planilha não encontrados");
        }

        const rows = response.rows as Row[];
        const filteredRows = rows.filter((row: Row) => row["Operação"]?.trim() === param);
        console.log('🎯 Linhas filtradas:', filteredRows); // Log das linhas filtradas
        
        const total = filteredRows.reduce((sum: number, row: Row) => {
        const valueStr = row["GGR"]?.toString().trim() || "0";
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

        console.log('💰 Total calculado:', total); // Log do total

        if (isMounted) {
        setData(total);
        setError(null);
        }
    } catch (err) {
        console.error('❌ Erro:', err); // Log de erro
        if (isMounted) {
        setError(err instanceof Error ? err : new Error('Erro desconhecido'));
        setData(null);
        }
    } finally {
        if (isMounted) {
        setLoading(false);
        }
    }
    }

    fetchData();

    return () => {
    isMounted = false;
    };
}, [param]);

return { data, loading, error };
}