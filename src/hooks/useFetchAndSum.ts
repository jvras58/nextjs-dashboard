import { useState, useEffect, useMemo } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/config";
import { FetchAndSumHookReturn } from "@/types/FetchAndSumHookReturn";

const useFetchAndSum = <T = any>(
    collectionName: string,
    paramKey?: string,
    paramValue?: string,
    sumField?: string
): FetchAndSumHookReturn<T> => {
    const [data, setData] = useState<T[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const memoizedQuery = useMemo(() => {
        const collectionRef = collection(db, collectionName);
        return paramKey && paramValue
            ? query(collectionRef, where(paramKey, "==", paramValue))
            : query(collectionRef);
    }, [collectionName, paramKey, paramValue]);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const querySnapshot = await getDocs(memoizedQuery);
                const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as T[];
                const totalValue = sumField
                    ? data.reduce((sum, item) => sum + (parseFloat((item as any)?.[sumField] ?? "0") || 0), 0)
                    : 0;

                if (isMounted) {
                    setData(data);
                    setTotal(totalValue);
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
    }, [memoizedQuery, sumField]);

    return { data, total, loading, error };
};

export default useFetchAndSum;