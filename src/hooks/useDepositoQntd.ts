import { useState, useEffect } from "react";
import getDocs from "@/actions/spreadsheets-actions/getDocs";
import Papa from "papaparse";

interface Row {
"Operação": string;
"Depósitos (Qtd)": string;
[key: string]: string;
}

interface UseQuantidadeDepositoReturn {
data: number | null;
loading: boolean;
error: Error | null;
}

export default function useQuantidadeDeposito(param: string): UseQuantidadeDepositoReturn {
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
    const { csv } = await getDocs("13hI14GUtGXqt_NEAvbJyl2TtRLLUB9c4Ve2oh98zJN4");

    const parsedData = Papa.parse<Row>(csv, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: false,
    });

    if (!parsedData.meta.fields) {
        throw new Error("Cabeçalhos não encontrados no CSV");
    }

    const total = parsedData.data
        .filter(row => row["Operação"]?.trim() === param)
        .reduce((sum, row) => {
        const valueStr = row["Depósitos (Qtd)"]?.trim() || "0";
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