import { BaseRow, fetchSheetData, parseCurrencyValue } from '@/service/google/baseGoogleService';

interface GgrRow extends BaseRow {
  "GGR": string;
}

export const fetchGgrValor = (param: string): Promise<number> => {
  return fetchSheetData<GgrRow>(param, "GGR", parseCurrencyValue);
};