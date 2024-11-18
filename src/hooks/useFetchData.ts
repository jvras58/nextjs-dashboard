import { useState, useEffect, useMemo } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/config";

const useFetchData = (collectionName: string, param?: string) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const memoizedQuery = useMemo(() => {
        const collectionRef = collection(db, collectionName);
        return param
            ? query(collectionRef, where("affiliate", "==", param))
            : query(collectionRef);
    }, [collectionName, param]);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const querySnapshot = await getDocs(memoizedQuery);
                const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
    }, [memoizedQuery]);

    return { data, loading, error };
};

export default useFetchData;