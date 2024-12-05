import { useState, useEffect } from "react";
import getDocs from "@/actions/spreadsheets-actions/getDocs";
import Papa from "papaparse";

interface Row {
[key: string]: any;
}

export default function useTotalApostado(param: string) {
const [totalApostado, setTotalApostado] = useState<number | null>(null);

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
        let totalApostaValueStr = row["Total Apostado"]?.trim() || "0";

        // Remove o prefixo "R$", substitui vírgulas por pontos e remove espaços extras
        totalApostaValueStr = totalApostaValueStr
        .replace("R$", "")
        .replace(/\s+/g, "")
        .replace(".", "")
        .replace(",", ".");

        // Converte para número ou considera como 0 em caso de erro
        const totalApostaValue = (() => {
            const value = parseFloat(totalApostaValueStr);
            if (isNaN(value)) {
                console.error(`Erro ao converter o valor: ${totalApostaValueStr}`);
                return 0;
            }
            return value;
        })();
        console.log(sum + totalApostaValue);
        return sum + totalApostaValue;

    }, 0);


    // Arredonda para 2 casas decimais
    const roundedTotal = Math.round((total + Number.EPSILON) * 100) / 100;

    setTotalApostado(roundedTotal);
    } catch (error) {
    console.error("Erro ao buscar dados:", error);
    }
}

fetchData();
}, [param]);
return totalApostado;
}
