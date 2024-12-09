import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebaseconfig';

interface DepositoData {
  nome_Campanha_deposito: string;
  ftd: number;
  ftd_amount: number;
  transaction_value_quantidade: number;
  transaction_value: number;
}

export const fetchDepositoData = async (affiliate: string) => {
  const q = query(
    collection(db, 'deposito'),
    where("affiliate", "==", affiliate),
    where("tags", "==", "deposit")
  );
  
  const querySnapshot = await getDocs(q);
  
  // Mapa para rastrear primeiro depósito por CPF
  const primeiroDeposito = new Map<string, boolean>();
  
  // Agrupa os depósitos por campanha
  const depositos = querySnapshot.docs.reduce((acc, doc) => {
    const data = doc.data();
    const campanha = data.campanha || 'Sem Campanha';
    const cpf = data.cpf;
    const valorDeposito = parseFloat(data.transaction_value) || 0;
    
    if (!acc[campanha]) {
      acc[campanha] = {
        nome_Campanha_deposito: campanha,
        ftd: 0,
        ftd_amount: 0,
        transaction_value_quantidade: 0,
        transaction_value: 0
      };
    }
    
    // Verifica se é primeiro depósito do CPF
    if (cpf && !primeiroDeposito.has(cpf)) {
      primeiroDeposito.set(cpf, true);
      acc[campanha].ftd++;
      acc[campanha].ftd_amount += valorDeposito;
    }
    
    acc[campanha].transaction_value_quantidade++;
    acc[campanha].transaction_value += valorDeposito;
    
    return acc;
  }, {} as Record<string, DepositoData>);

  // Formata os valores numéricos
  return Object.values(depositos).map(deposito => ({
    ...deposito,
    ftd_amount: Number(deposito.ftd_amount.toFixed(2)),
    transaction_value: Number(deposito.transaction_value.toFixed(2))
  }));
};