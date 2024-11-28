import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebaseconfig';

interface Cadastro {
    id: string;
    affiliate: string;
    estado: string;
    phone: string;
}

const useCadastroPorEstado = (affiliate: string) => {
    const [cadastrosPorEstado, setCadastrosPorEstado] = useState<Record<string, Cadastro[]>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;
        let unsubscribe: (() => void) | undefined;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch('/data/Estados_Phone.csv');
                if (!response.ok) {
                    throw new Error(`Erro ao buscar o arquivo CSV: ${response.status}`);
                }
                const csvText = await response.text();

                // Parsear CSV
                const results = Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true,
                });

                const dddToEstadoMap: Record<string, string> = {};

                results.data.forEach((row: any) => {
                    const estado = row['Estado'];
                    const ddds = row['DDD'].split(',').map((ddd: string) => ddd.trim());
                    ddds.forEach((ddd: string) => {
                        dddToEstadoMap[ddd] = estado;
                    });
                });

                const q = query(
                    collection(db, 'cadastro'),
                    where('affiliate', '==', affiliate)
                );

                unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const cadastros: Cadastro[] = [];
                    querySnapshot.forEach((doc) => {
                        cadastros.push(doc.data() as Cadastro);
                    });

                    const cadastrosAgrupados: Record<string, Cadastro[]> = {};

                    cadastros.forEach((cadastro) => {
                        let estado = cadastro.estado;
                        if (!estado || estado === '') {
                            const match = cadastro.phone.match(/\((\d{2})\)/);
                            if (match) {
                                const ddd = match[1];
                                estado = dddToEstadoMap[ddd] || 'Desconhecido';
                            } else {
                                estado = 'Desconhecido';
                            }
                        }
                        if (!cadastrosAgrupados[estado]) {
                            cadastrosAgrupados[estado] = [];
                        }
                        cadastrosAgrupados[estado].push(cadastro);
                    });

                    if (isMounted) {
                        setCadastrosPorEstado(cadastrosAgrupados);
                    }
                }, (error) => {
                    if (isMounted) {
                        setError(error);
                        console.error('Erro ao processar os dados:', error);
                    }
                });
            } catch (error) {
                if (isMounted) {
                    setError(error as Error);
                    console.error('Erro ao processar os dados:', error);
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
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [affiliate]);

    return { cadastrosPorEstado, loading, error };
};

export default useCadastroPorEstado;