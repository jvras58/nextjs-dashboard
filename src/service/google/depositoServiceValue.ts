import { BaseRow, fetchSheetData, parseCurrencyValue } from '@/service/google/baseGoogleService';

interface DepositoValorRow extends BaseRow {
  "Depósitos (Valor)": string;
}

export const fetchDepositoValor = (param: string): Promise<number> => {
  return fetchSheetData<DepositoValorRow>(param, "Depósitos (Valor)", parseCurrencyValue);
};