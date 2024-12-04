import { useState, useEffect } from "react";
import getDocs from "@/actions/spreadsheets-actions/getDocs";
import Papa from "papaparse";

interface Row {
[key: string]: any;
}

export default function useTotalInvestido(param: string) {
const [totalInvestido, setTotalInvestido] = useState<number | null>(null);

useEffect(() => {
async function fetchData() {
    try {
    const { csv } = await getDocs("13hI14GUtGXqt_NEAvbJyl2TtRLLUB9c4Ve2oh98zJN4");

    const parsedData = Papa.parse<Row>(csv, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: false,
    });

    const rows = parsedData.data;
    const headers = parsedData.meta.fields;

    if (!headers) {
        console.error("Cabeçalhos não encontrados no CSV.");
        return;
    }

    const filteredRows = rows.filter((row) => {
        const operationValue = row["Operação"];
        return operationValue?.trim() === param;
    });

    const total = filteredRows.reduce((sum, row) => {
        let investValueStr = row["Total Investido (Dia)"]?.trim() || "0";

        // Remove o prefixo "R$", substitui vírgulas por pontos e remove espaços extras
        investValueStr = investValueStr
        .replace("R$", "")
        .replace(/\s+/g, "")
        .replace(",", ".");

        // Converte para número ou considera como 0 em caso de erro
        const investValue = (() => {
            const value = parseFloat(investValueStr);
            if (isNaN(value)) {
                console.error(`Erro ao converter o valor: ${investValueStr}`);
                return 0;
            }
            return value;
        })();

        return sum + investValue;
    }, 0);

    // Arredonda para 2 casas decimais
    const roundedTotal = Math.round((total + Number.EPSILON) * 100) / 100;

    setTotalInvestido(roundedTotal);
    } catch (error) {
    console.error("Erro ao buscar dados:", error);
    }
}

fetchData();
}, [param]);

return totalInvestido;
}
