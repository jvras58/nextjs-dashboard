import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import useCadastroCount from './useCadastroCount';

const CACHE_EXPIRATION_TIME = 1000 * 60 * 5; // 5 minutos

const useCustoCadastro = (affiliate: string) => {
const [custoPorCadastro, setCustoPorCadastro] = useState<number | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<Error | null>(null);

const { count: totalCadastros, loading: loadingCadastros, error: errorCadastros } = useCadastroCount('cadastro', affiliate);

useEffect(() => {
const fetchInvestimento = async () => {
    setLoading(true);
    setError(null);

    const today = new Date();
    const dateString = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    const cacheKey = `custoPorCadastro-${affiliate}-${dateString}`;
    const cachedData = localStorage.getItem(cacheKey);
    const cachedTime = localStorage.getItem(`${cacheKey}-time`);

    if (cachedData && cachedTime && (Date.now() - parseInt(cachedTime)) < CACHE_EXPIRATION_TIME) {
    setCustoPorCadastro(parseFloat(cachedData));
    setLoading(false);
    return;
    }

    try {
    const startOfDay = Timestamp.fromDate(new Date(`${dateString}T00:00:00`));
    const endOfDay = Timestamp.fromDate(new Date(`${dateString}T23:59:59`));

    const q = query(
        collection(db, 'deposito'),
        where('affiliate', '==', affiliate),
        where('payment_date', '>=', startOfDay),
        where('payment_date', '<=', endOfDay)
    );

    const querySnapshot = await getDocs(q);
    let totalInvestido = 0;

    querySnapshot.forEach((doc) => {
        totalInvestido += parseFloat(doc.data().transaction_value);
    });

    console.log('Total Investido:', totalInvestido);
    console.log('Total Cadastros:', totalCadastros);

    if (totalCadastros > 0) {
        const custo = totalInvestido / totalCadastros;
        setCustoPorCadastro(custo);
        localStorage.setItem(cacheKey, custo.toString());
        localStorage.setItem(`${cacheKey}-time`, Date.now().toString());
    } else {
        setCustoPorCadastro(0); // Se não houver cadastros, o custo por cadastro é 0
    }
    } catch (error) {
    setError(error as Error);
    } finally {
    setLoading(false);
    }
};

if (!loadingCadastros && !errorCadastros) {
    fetchInvestimento();
}
}, [affiliate, totalCadastros, loadingCadastros, errorCadastros]);

return { custoPorCadastro, loading, error };
};

export default useCustoCadastro;