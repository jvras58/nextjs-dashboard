import { collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore';
import { db } from '@/config/firebaseconfig';
import { FirebaseDocument } from '@/types/firebaseTypes';

interface SheetRow {
  "Código": string;
  [key: string]: any;
}

export const fetchSheetData = async () => {
  const sheetsIndex = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_OPERATIONS_SHEET_ID;
  const spreadsheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!spreadsheetId) {
    throw new Error("O ID da planilha não está definido");
  }

  const response = await fetch(
    `/api/sheets?spreadsheetId=${spreadsheetId}&sheetIndex=${sheetsIndex}`
  );

  if (!response.ok) {
    throw new Error("Falha ao buscar dados da planilha");
  }

  const sheetData = await response.json();
  return sheetData.rows.map((row: SheetRow) => row["Código"]?.trim()).filter(Boolean);
};

export const fetchFiliadoData = async (collectionName: string, affiliateCodes: string[]) => {
  const q = query(
    collection(db, collectionName),
    where("affiliate", "in", affiliateCodes),
    // TODO: preciso que felipe me libere um indice composto para poder usar orderBy e limit
    // orderBy("date", "desc"),
    // limit(1)
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