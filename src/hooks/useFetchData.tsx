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
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    if (isMounted) {
        setData(data);
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