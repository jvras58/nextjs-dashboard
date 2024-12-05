import { useState, useEffect } from "react";
import getDocs from "@/actions/spreadsheets-actions/getDocs";

interface Row {
"Operação": string;
"FTD (Qtd)": string;
[key: string]: string;
}

interface UseQuantidadeFTDReturn {
data: number | null;
loading: boolean;
error: Error | null;
}

export default function useQuantidadeFTD(param: string): UseQuantidadeFTDReturn {
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
    const response = await getDocs("13hI14GUtGXqt_NEAvbJyl2TtRLLUB9c4Ve2oh98zJN4");

    if (!response.headers || !response.rows) {
        throw new Error("Dados da planilha não encontrados");
    }

    const rows = response.rows as Row[];
    
    const total = rows
        .filter((row: Row) => row["Operação"]?.trim() === param)
        .reduce((sum: number, row: Row) => {
        const valueStr = row["FTD (Qtd)"]?.toString().trim() || "0";
        const value = parseInt(valueStr, 10);
        
        if (isNaN(value)) {
            console.warn(`Valor inválido encontrado: ${valueStr}`);
            return sum;
        }

        return sum + value;
        }, 0);

    if (isMounted) {
        setData(total);
        setError(null);
    }
    } catch (err) {
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