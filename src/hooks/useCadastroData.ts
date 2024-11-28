import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../config/firebaseconfig';

const useCadastroData = (collectionName: string, affiliate: string) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;

        const q = query(collection(db, collectionName), where("affiliate", "==", affiliate));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            if (isMounted) {
                const newData = querySnapshot.docs.map(doc => doc.data());
                setData(newData);
                setLoading(false);
            }
        }, (error) => {
            if (isMounted) {
                setError(error);
                setLoading(false);
            }
        });

        return () => {
            isMounted = false;
            unsubscribe();
        };
    }, [collectionName, affiliate]);

    return { data, loading, error };
};

export default useCadastroData;