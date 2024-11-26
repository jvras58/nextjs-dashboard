import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';


// Caching e localstoreged dando muitos problemas do nada não carregava nada de usuario ficava dando 0 direto mas tinha dados no firestore
// outra abordagem é necessaria talvez um redis da vida... mas não sei como funciona no front end
const CACHE_EXPIRATION_TIME = 1000 * 60 * 5;

const useCadastroCount = (collectionName: string, affiliate: string) => {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [growthRate, setGrowthRate] = useState(0);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            const cacheKey = `${collectionName}-${affiliate}`;
            const cachedData = localStorage.getItem(cacheKey);
            const cachedTime = localStorage.getItem(`${cacheKey}-time`);
            const previousCount = parseInt(cachedData || '0');

            if (cachedData && cachedTime && (Date.now() - parseInt(cachedTime)) < CACHE_EXPIRATION_TIME) {
                setCount(previousCount);
                setLoading(false);
            } else {
                try {
                    const q = query(collection(db, collectionName), where("affiliate", "==", affiliate));
                    const querySnapshot = await getDocs(q);
                    if (isMounted) {
                        const newCount = querySnapshot.size;
                        console.log('Firestore data:', querySnapshot.docs.map(doc => doc.data()));
                        setCount(newCount);
                        localStorage.setItem(cacheKey, newCount.toString());
                        localStorage.setItem(`${cacheKey}-time`, Date.now().toString());
                        const growth = previousCount ? ((newCount - previousCount) / previousCount) * 100 : 0;
                        setGrowthRate(growth);
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
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [collectionName, affiliate]);

    return { count, loading, error, growthRate };
};

export default useCadastroCount;