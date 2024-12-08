import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebaseconfig';

interface Cadastro {
  id: string;
  affiliate: string;
  estado: string;
}

export const fetchCadastrosPorEstado = async (affiliate: string) => {
  const q = query(
    collection(db, 'cadastro'),
    where('affiliate', '==', affiliate)
  );

  const querySnapshot = await getDocs(q);
  const cadastros = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Cadastro[];

  // Agrupa por estado
  return cadastros.reduce((acc, cadastro) => {
    const estado = cadastro.estado || 'Desconhecido';
    if (!acc[estado]) {
      acc[estado] = [];
    }
    acc[estado].push(cadastro);
    return acc;
  }, {} as Record<string, Cadastro[]>);
};