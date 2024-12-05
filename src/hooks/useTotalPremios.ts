import { useState, useEffect } from "react";
import getDocs from "@/actions/spreadsheets-actions/getDocs";

interface Row {
"Operação": string;
"Total de Prêmios": string;
[key: string]: string;
}

interface UseTotalPremiosReturn {
data: number | null;
loading: boolean;
error: Error | null;
}

export default function useTotalPremios(param: string): UseTotalPremiosReturn {
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
        const valueStr = row["Total de Prêmios"]?.toString().trim() || "0";
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
        // const roundedTotal = Math.round((total + Number.EPSILON) * 100) / 100;
    if (isMounted) {
        setData(total); // roundedTotal
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