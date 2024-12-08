import { BaseRow, fetchSheetData, parseCurrencyValue } from '@/service/google/baseGoogleService';

interface ApostadoRow extends BaseRow {
  "Total Apostado": string;
}

export const fetchTotalApostado = (param: string): Promise<number> => {
  return fetchSheetData<ApostadoRow>(param, "Total Apostado", parseCurrencyValue);
};