import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebaseconfig';

/**
 * Interface que define a estrutura dos dados de depósito
 */
interface DepositoData {
  nome_Campanha_deposito: string;    // Nome da campanha
  ftd: number;                       // Quantidade de primeiros depósitos
  ftd_amount: number;                // Valor total dos primeiros depósitos
  transaction_value_quantidade: number; // Quantidade total de transações
  transaction_value: number;         // Valor total das transações
}

/**
 * Busca e processa dados de depósitos para um afiliado específico
 * @param affiliate - Identificador do afiliado
 * @returns Array de dados de depósito processados por campanha
 */
export const fetchDepositoData = async (affiliate: string): Promise<DepositoData[]> => {
  // Consulta depósitos do afiliado
  const depositosQuery = criarQueryDepositos(affiliate);
  const querySnapshot = await getDocs(depositosQuery);
  
  // Processa os depósitos
  const depositosProcessados = processarDepositos(querySnapshot);
  
  // Formata os valores numéricos e retorna
  return formatarValoresDepositos(depositosProcessados);
};

/**
 * Cria a query para buscar depósitos no Firestore
 */
const criarQueryDepositos = (affiliate: string) => {
  return query(
    collection(db, 'deposito'),
    where("affiliate", "==", affiliate),
  );
};

/**
 * Processa os documentos de depósito retornados pelo Firestore
 */
const processarDepositos = (querySnapshot: any) => {
  const primeiroDepositoPorCampanha = new Map<string, Set<string>>();

  return querySnapshot.docs.reduce((depositosAgrupados: Record<string, DepositoData>, doc: any) => {
    const dadosDeposito = doc.data();
    const campanha = dadosDeposito.campanha || 'Sem Campanha';
    const tags = dadosDeposito.tags?.toLowerCase() || '';
    const valorDeposito = parseFloat(dadosDeposito.transaction_value) || 0;

    // Inicializa dados da campanha se não existirem
    if (!depositosAgrupados[campanha]) {
      depositosAgrupados[campanha] = inicializarDadosCampanha(campanha);
      primeiroDepositoPorCampanha.set(campanha, new Set<string>());
    }

    const ftdProcessados = primeiroDepositoPorCampanha.get(campanha)!;

    // Verifica se é "first" e atualiza estatísticas de FTD
    if (tags === 'first' && !ftdProcessados.has(dadosDeposito.cpf)) {
      ftdProcessados.add(dadosDeposito.cpf); // Marca CPF como processado para FTD
      depositosAgrupados[campanha].ftd++;
      depositosAgrupados[campanha].ftd_amount += valorDeposito;
    }

    // Atualiza estatísticas gerais da campanha
    depositosAgrupados[campanha].transaction_value_quantidade++;
    depositosAgrupados[campanha].transaction_value += valorDeposito;

    return depositosAgrupados;
  }, {});
};

/**
 * Inicializa estrutura de dados para uma nova campanha
 */
const inicializarDadosCampanha = (nomeCampanha: string): DepositoData => ({
  nome_Campanha_deposito: nomeCampanha,
  ftd: 0,
  ftd_amount: 0,
  transaction_value_quantidade: 0,
  transaction_value: 0
});

/**
 * Formata os valores numéricos dos depósitos
 */
const formatarValoresDepositos = (depositos: Record<string, DepositoData>): DepositoData[] => {
  return Object.values(depositos).map(deposito => ({
    ...deposito, // Mantém os dados originais
    ftd_amount: Number(deposito.ftd_amount.toFixed(2)), // Formata valor dos FTDs
    transaction_value: Number(deposito.transaction_value.toFixed(2)) // Formata valor total das transações
  }));
};
