import { BaseRow, fetchSheetData, parseCurrencyValue } from '@/service/google/baseGoogleService';

interface PremiosRow extends BaseRow {
  "Total de Prêmios": string;
}

export const fetchTotalPremios = (param: string): Promise<number> => {
  return fetchSheetData<PremiosRow>(param, "Total de Prêmios", parseCurrencyValue);
};