import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebaseconfig';
import { FirebaseDocument } from '../types/firebaseTypes';
import getDocs from "@/actions/spreadsheets-actions/getDocs";

const useFiliadoList = (collectionName: string) => {
const [data, setData] = useState<FirebaseDocument[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<Error | null>(null);

useEffect(() => {
const fetchData = async () => {

    try {
        const spreadsheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_SPREADSHEET_ID;
        if (!spreadsheetId) {
            throw new Error("Spreadsheet ID is not defined");
        }
        const response = await getDocs(spreadsheetId, 1);

    if (!response.rows) {
        throw new Error("Dados da planilha não encontrados");
    }

    // Extrai os códigos
    const affiliateCodes = response.rows.map(row => row["Código"]).filter(Boolean);

    // Cache key para armazenar localmente
    const cacheKey = `${collectionName}-filtered`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
        setData(JSON.parse(cachedData));
        setLoading(false);
    }

    // Query no Firestore usando where in com os códigos da planilha
    const q = query(
        collection(db, collectionName),
        where("affiliate", "in", affiliateCodes)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
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

        const afiliados = Array.from(afiliadosMap.values()).map(afiliados => {
        const sortedAfiliados = afiliados.sort(
            (a: any, b: any) => new Date(b.date!).getTime() - new Date(a.date!).getTime()
        );
        const [mostRecent] = sortedAfiliados;
        return { id: mostRecent.id, ...mostRecent };
        });

        setData(afiliados);
        localStorage.setItem(cacheKey, JSON.stringify(afiliados));
        setLoading(false);
    }, (error) => {
        setError(error);
        setLoading(false);
    });

    return () => {
        unsubscribe();
    };
    } catch (error) {
    setError(error as Error);
    setLoading(false);
    }
};

fetchData();
}, [collectionName]);

return { data, loading, error };
};

export default useFiliadoList;