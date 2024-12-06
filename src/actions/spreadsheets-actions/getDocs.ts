"use server";

import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";


const serviceAccountAuth = new JWT({
    email:process.env.NEXT_PUBLIC_GOOGLE_SHEETS_CLIENT_EMAIL, // Variável de ambiente para o e-mail do serviço
    key: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n"), // Corrige quebras de linha na chave
    scopes: ["https://www.googleapis.com/auth/spreadsheets"], // Escopo necessário
});

export default async function getDocs(spreadsheetId: string, sheetIndex: number = 0) {
    const doc = new GoogleSpreadsheet(spreadsheetId, serviceAccountAuth);
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[sheetIndex]; // Pega a planilha definida pelo índice 
    const rows = await sheet.getRows(); // Pega todas as linhas da planilha

    // Converte as linhas em um array de objetos
    const data = rows.map(row => {
        // Pega as chaves (cabeçalhos) da planilha
        const headers = sheet.headerValues;
        const rowData: Record<string, any> = {};
        
        // Cria um objeto com os valores de cada coluna
        headers.forEach(header => {
            rowData[header] = row.get(header);
        });
        
        return rowData;
    });

    return {
        title: doc.title,
        sheetTitle: sheet.title,
        headers: sheet.headerValues,
        rows: data,
        totalRows: rows.length
    };
}