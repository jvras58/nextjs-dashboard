import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebaseconfig';
import { FirebaseDocument } from '@/types/firebaseTypes';

interface SheetRow {
  "Código": string;
  [key: string]: any;
}

export const fetchSheetData = async () => {
  const spreadsheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!spreadsheetId) {
    throw new Error("Spreadsheet ID is not defined");
  }

  const response = await fetch(
    `/api/sheets?spreadsheetId=${spreadsheetId}&sheetIndex=1`
  );

  if (!response.ok) {
    throw new Error("Falha ao buscar dados da planilha");
  }

  const sheetData = await response.json();
  return sheetData.rows.map((row: SheetRow) => row["Código"]).filter(Boolean);
};

export const fetchFiliadoData = async (collectionName: string, affiliateCodes: string[]) => {
  const q = query(
    collection(db, collectionName),
    where("affiliate", "in", affiliateCodes)
  );

  const querySnapshot = await getDocs(q);
  const newData = querySnapshot.docs.map(doc => ({ 
    id: doc.id, 
    ...doc.data() 
  })) as FirebaseDocument[];

  const afiliadosMap = new Map();

  newData.filter(item => item.affiliate).forEach(item => {
    if (!afiliadosMap.has(item.affiliate)) {
      afiliadosMap.set(item.affiliate, []);
    }
    afiliadosMap.get(item.affiliate).push(item);
  });

  return Array.from(afiliadosMap.values()).map(afiliados => {
    const sortedAfiliados = afiliados.sort(
      (a: any, b: any) => new Date(b.date!).getTime() - new Date(a.date!).getTime()
    );
    const [mostRecent] = sortedAfiliados;
    return { id: mostRecent.id, ...mostRecent };
  });
};