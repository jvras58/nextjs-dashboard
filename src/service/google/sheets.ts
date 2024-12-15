import { GoogleSpreadsheet, GoogleSpreadsheetRow } from "google-spreadsheet";
import { JWT } from "google-auth-library";

const MAX_RETRIES = 3;
const BASE_DELAY = 1000;

const createGoogleSheetsClient = () => {
  if (!process.env.NEXT_PUBLIC_GOOGLE_SHEETS_CLIENT_EMAIL || !process.env.NEXT_PUBLIC_GOOGLE_SHEETS_PRIVATE_KEY) {
    throw new Error('Credenciais do Google Sheets não configuradas');
  }

  return new JWT({
    email: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_CLIENT_EMAIL, // Variável de ambiente para o e-mail do serviço
    key: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n"), // Corrige quebras de linha na chave
    scopes: ["https://www.googleapis.com/auth/spreadsheets"], // Escopo necessário
});
};

interface SheetData {
  title: string;
  sheetTitle: string;
  headers: string[];
  rows: Record<string, any>[];
  totalRows: number;
}

export class GoogleSheetsService {
  private static instance: GoogleSheetsService;
  private auth: JWT;
  private lastAuthTime: number;

  private constructor() {
    this.auth = createGoogleSheetsClient();
    this.lastAuthTime = Date.now();
  }

  private async renewAuthIfNeeded() {
    const currentTime = Date.now();
    const ONE_HOUR = 50 * 60 * 1000; // 50 minutos em milissegundos (margem de segurança)

    if (currentTime - this.lastAuthTime >= ONE_HOUR) {
      this.auth = createGoogleSheetsClient();
      this.lastAuthTime = currentTime;
    }
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new GoogleSheetsService();
    }
    return this.instance;
  }

  async getSheetData(spreadsheetId: string, sheetIndex = 0): Promise<SheetData> {
    let attempt = 0;

    while (attempt < MAX_RETRIES) {
      try {
        await this.renewAuthIfNeeded();

        const doc = new GoogleSpreadsheet(spreadsheetId, this.auth);
        await doc.loadInfo();

        const sheet = doc.sheetsByIndex[sheetIndex];
        const rows = await sheet.getRows();

        const data = rows.map((row: GoogleSpreadsheetRow) => {
          const headers = sheet.headerValues;
          const rowData: Record<string, any> = {};
          
          headers.forEach((header: string) => {
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

      } catch (error: any) {
        if (error?.response?.data?.error === 'invalid_grant') {
          this.auth = createGoogleSheetsClient();
          this.lastAuthTime = Date.now();
          attempt++;
          continue;
        }

        if (error?.response?.status === 429 && attempt < MAX_RETRIES - 1) {
          const delay = BASE_DELAY * Math.pow(2, attempt);
          await new Promise(resolve => setTimeout(resolve, delay));
          attempt++;
          continue;
        }

        console.error('Erro ao acessar Google Sheets:', error);
        throw error;
      }
    }

    throw new Error('Máximo de tentativas excedido');
  }
}

export const sheetsService = GoogleSheetsService.getInstance();