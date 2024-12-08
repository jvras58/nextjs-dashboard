import { useState, useEffect } from "react";
import { buscarOperacao } from "@/utils/BuscarOperacao";

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
    
    
    setLoading(true);
    setError(null);

    try {
        // 1. Busca o nome da operação baseado no Código
        const operacaoResult = await buscarOperacao(param);
        if (!operacaoResult.exists || !operacaoResult.nome) {
            throw new Error("Operação correspondente não encontrada");
        }

        const operacaoNome = operacaoResult.nome;

        // 2. Busca a planilha de operações 
        const spreadsheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_SPREADSHEET_ID;
        if (!spreadsheetId) {
            throw new Error("Spreadsheet ID is not defined");
        }
        const response = await fetch(
            `/api/sheets?spreadsheetId=${spreadsheetId}`
          );
    
          if (!response.ok) {
            throw new Error("Falha ao buscar dados da planilha");
          }
        
        const sheetData = await response.json();
        const rows = sheetData.rows as Row[];
                
        // 3. Filtra e calcula o total baseado na operação
        const filteredRows = rows.filter((row: Row) => row["Operação"]?.trim() === operacaoNome.trim());
        
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

        // console.log('💰 Total calculado:', total);

        if (isMounted) {
        setData(total);
        setError(null);
        }
    } catch (err) {
        // console.error('❌ Erro:', err);
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