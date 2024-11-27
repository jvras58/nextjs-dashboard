import { useState, useEffect } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FirebaseDocument } from '../types/firebaseTypes';

// TODO: add onSnapshot nos outros hooks 
const useFiliadoList = (collectionName: string) => {
const [data, setData] = useState<FirebaseDocument[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<Error | null>(null);

useEffect(() => {
const cacheKey = collectionName;
const cachedData = localStorage.getItem(cacheKey);

if (cachedData) {
    setData(JSON.parse(cachedData));
    setLoading(false);
}

const q = query(collection(db, collectionName));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const newData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as FirebaseDocument[];
    const afiliadosMap = new Map();

    newData.filter(item => item.affiliate).forEach(item => {
    if (!afiliadosMap.has(item.affiliate)) {
        afiliadosMap.set(item.affiliate, []);
    }
    afiliadosMap.get(item.affiliate).push(item);
    });

    const afiliados = Array.from(afiliadosMap.values()).map(afiliados => {
    const sortedAfiliados = afiliados.sort((a: any, b: any) => new Date(b.date!).getTime() - new Date(a.date!).getTime());
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
}, [collectionName]);

return { data, loading, error };
};

export default useFiliadoList;