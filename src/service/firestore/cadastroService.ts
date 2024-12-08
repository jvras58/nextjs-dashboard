
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebaseconfig';

export const fetchCadastroData = async (collectionName: string, affiliate: string) => {
  const q = query(
    collection(db, collectionName), 
    where("affiliate", "==", affiliate)
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};