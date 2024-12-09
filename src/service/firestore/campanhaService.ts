import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebaseconfig';

interface CampanhaData {
  nome_campanha: string;
  quantidade_de_cadastro: number;
}

export const fetchCampanhaData = async (affiliate: string) => {
  const q = query(
    collection(db, 'cadastro'),
    where("affiliate", "==", affiliate)
  );
  
  const querySnapshot = await getDocs(q);
  
  // Agrupa os cadastros por campanha
  const campanhas = querySnapshot.docs.reduce((acc, doc) => {
    const data = doc.data();
    const campanha = data.campanha || 'Sem Campanha';
    
    if (!acc[campanha]) {
      acc[campanha] = 0;
    }
    acc[campanha]++;
    
    return acc;
  }, {} as Record<string, number>);
  
  // Formata os dados
  return Object.entries(campanhas).map(([nome_campanha, quantidade_de_cadastro]): CampanhaData => ({
    nome_campanha,
    quantidade_de_cadastro
  }));
};