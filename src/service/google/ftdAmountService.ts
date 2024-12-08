import { BaseRow, fetchSheetData, parseCurrencyValue } from '@/service/google/baseGoogleService';

interface FtdAmountRow extends BaseRow {
  "FTD (Valor)": string;
}

export const fetchFtdAmount = (param: string): Promise<number> => {
  return fetchSheetData<FtdAmountRow>(param, "FTD (Valor)", parseCurrencyValue);
};