import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';

const CACHE_EXPIRATION_TIME = 1000 * 60 * 5;

const useCadastroCount = (collectionName: string, affiliate: string) => {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [growthRate, setGrowthRate] = useState(0);

    useEffect(() => {
        let isMounted = true;

        const cacheKey = `${collectionName}-${affiliate}`;
        const cachedData = localStorage.getItem(cacheKey);
        const cachedTime = localStorage.getItem(`${cacheKey}-time`);
        const previousCount = parseInt(cachedData || '0');

        if (cachedData && cachedTime && (Date.now() - parseInt(cachedTime)) < CACHE_EXPIRATION_TIME) {
            setCount(previousCount);
            setLoading(false);
        } else {
            const q = query(collection(db, collectionName), where("affiliate", "==", affiliate));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                if (isMounted) {
                    const newCount = querySnapshot.size;
                    setCount(newCount);
                    localStorage.setItem(cacheKey, newCount.toString());
                    localStorage.setItem(`${cacheKey}-time`, Date.now().toString());
                    const growth = previousCount ? ((newCount - previousCount) / previousCount) * 100 : 0;
                    setGrowthRate(growth);
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
        }
    }, [collectionName, affiliate]);

    return { count, loading, error, growthRate };
};

export default useCadastroCount;