import { BaseRow, fetchSheetData, parseNumericValue } from '@/service/google/baseGoogleService';

interface FtdRow extends BaseRow {
  "FTD (Qtd)": string;
}

export const fetchQuantidadeFTD = (param: string): Promise<number> => {
  return fetchSheetData<FtdRow>(param, "FTD (Qtd)", parseNumericValue);
};