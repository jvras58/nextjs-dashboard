import { useState, useEffect } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FirebaseDocument } from '../types/firebaseTypes';

const useFetchData = (collectionName: string) => {
const [data, setData] = useState<FirebaseDocument[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<Error | null>(null);

useEffect(() => {
let isMounted = true;

const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
    const q = query(collection(db, collectionName));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as FirebaseDocument[];
    if (isMounted) {
        const afiliadosMap = new Map();

        data.filter(item => item.affiliate).forEach(item => {
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
    }
    } catch (error) {
    if (isMounted) {
        setError(error as Error);
    }
    } finally {
    if (isMounted) {
        setLoading(false);
    }
    }
};

fetchData();

return () => {
    isMounted = false;
};
}, [collectionName]);

return { data, loading, error };
};

export default useFetchData;