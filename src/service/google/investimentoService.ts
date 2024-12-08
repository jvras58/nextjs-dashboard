import { BaseRow, fetchSheetData, parseCurrencyValue } from '@/service/google/baseGoogleService';

interface InvestimentoRow extends BaseRow {
  "Total Investido (Dia)": string;
}

export const fetchTotalInvestido = (param: string): Promise<number> => {
  return fetchSheetData<InvestimentoRow>(param, "Total Investido (Dia)", parseCurrencyValue);
};