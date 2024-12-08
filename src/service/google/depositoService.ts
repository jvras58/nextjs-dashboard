
import { BaseRow, fetchSheetData, parseNumericValue } from '@/service/google/baseGoogleService';
interface DepositoRow extends BaseRow {
  "Depósitos (Qtd)": string;
}

export const fetchQuantidadeDeposito = (param: string): Promise<number> => {
  return fetchSheetData<DepositoRow>(param, "Depósitos (Qtd)", parseNumericValue);
};