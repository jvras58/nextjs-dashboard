import { useState, useEffect, useMemo } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/config";

// Função para processar os dados e calcular os valores necessários para o gráfico
const processChartData = (rawData: any[]) => {
  const groupedByMonth = rawData.reduce((acc, item) => {
    // Extrai e converte a data do campo "payment_date" (formato DD/MM/YYYY)
    const [day, month, year] = item.payment_date.split("/");
    const formattedDate = `${year}-${month}-${day}`; // ISO format (YYYY-MM-DD)
    const paymentDate = new Date(formattedDate);

    // Verifica se a data é válida
    if (isNaN(paymentDate.getTime())) {
      console.error(`Data inválida encontrada: ${item.payment_date}`);
      return acc; // Ignora dados com data inválida
    }

    const monthName = paymentDate.toLocaleString("en-US", { month: "short" }); // Ex: "Jan"

    if (!acc[monthName]) {
      acc[monthName] = { totalValue: 0, totalCount: 0 };
    }

    acc[monthName].totalValue += parseFloat(item.transaction_value) || 0;
    acc[monthName].totalCount += 1;
    return acc;
  }, {});

  // Extraindo as categorias (meses) e os valores correspondentes
  const categories = Object.keys(groupedByMonth);
  const totalArrecadado = categories.map((month) => groupedByMonth[month].totalValue);
  const depositosRealizados = categories.map((month) => groupedByMonth[month].totalCount);

  const processedData = { categories, totalArrecadado, depositosRealizados };

  // Adiciona log para verificar os dados processados
  console.log("Dados processados:", processedData);

  return processedData;
};

// Hook para buscar e processar os dados do Firestore
const useDepositsChart = (affiliate?: string) => {
  const [data, setData] = useState({
    categories: [] as string[],
    totalArrecadado: [] as number[],
    depositosRealizados: [] as number[],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const memoizedQuery = useMemo(() => {
    const collectionRef = collection(db, "deposito");
    return affiliate
      ? query(collectionRef, where("affiliate", "==", affiliate))
      : query(collectionRef);
  }, [affiliate]);

  useEffect(() => {
    let isMounted = true;

    const fetchDeposits = async () => {
      setLoading(true);
      setError(null);

      try {
        const querySnapshot = await getDocs(memoizedQuery);
        const rawData = querySnapshot.docs.map((doc) => doc.data());

        // Adiciona log para verificar os dados brutos
        console.log("Dados brutos recebidos:", rawData);

        // Processa os dados para o formato necessário
        const processedData = processChartData(rawData);

        if (isMounted) {
          setData(processedData);
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDeposits();

    return () => {
      isMounted = false;
    };
  }, [memoizedQuery]);

  // Adiciona log para verificar os dados retornados pelo hook
  console.log("Dados retornados pelo hook:", { data, loading, error });

  return { data, loading, error };
};

export default useDepositsChart;
