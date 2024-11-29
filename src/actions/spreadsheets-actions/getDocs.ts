"use server";

import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { createObjectCsvStringifier } from 'csv-writer';
import credentials from "@/config/google-sheets-api.json";

const serviceAccountAuth = new JWT({
    email: credentials.client_email, // Variável de ambiente para o e-mail do serviço
    key: credentials.private_key?.replace(/\\n/g, "\n"), // Corrige quebras de linha na chave
    scopes: ["https://www.googleapis.com/auth/spreadsheets"], // Escopo necessário
});

export default async function getDocs(spreadsheetId: string) {
    // Use o ID da planilha passado como parâmetro
    const doc = new GoogleSpreadsheet(spreadsheetId, serviceAccountAuth);

    // Carrega as informações da planilha
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0]; // Pegue a primeira aba da planilha
    const rows = await sheet.getRows(); // Pegue todas as linhas da aba

    // Crie o CSV em memória
    const csvStringifier = createObjectCsvStringifier({
        header: sheet.headerValues.map(header => ({ id: header, title: header }))
    });

    const csv = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(
        rows.map(row => {
            const rowData: { [key: string]: any } = {};
            sheet.headerValues.forEach(header => {
                rowData[header] = row.get(header);
            });
            return rowData;
        })
    );

    // console.log("CSV em Memoria: ", csv);

    return { title: doc.title, csv };
}

// Exemplo de uso:

// useEffect(() => {
//     async function fetchData() {
//         try {
//             const spreadsheetId = "1NMZv6FsBUdzJLoEozSyOtscnGVnkGkBPng9xrtsRwLc"; // Substitua pelo ID dinâmico
//             const { title, csv } = await getDocs(spreadsheetId);
//             console.log({ title, csv });
//         } catch (error) {
//             console.error("Erro ao buscar dados:", error);
//         }
//     }
//     fetchData();
// }, []);