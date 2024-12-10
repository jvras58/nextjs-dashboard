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
  const primeiroDepositoPorCPF = new Map<string, boolean>();
  
  return querySnapshot.docs.reduce((depositosAgrupados: Record<string, DepositoData>, doc: any) => {
    const dadosDeposito = doc.data();
    const campanha = dadosDeposito.campanha || 'Sem Campanha';
    const cpf = dadosDeposito.cpf;
    const valorDeposito = parseFloat(dadosDeposito.transaction_value) || 0;
    
    // Inicializa dados da campanha se não existirem
    if (!depositosAgrupados[campanha]) {
      depositosAgrupados[campanha] = inicializarDadosCampanha(campanha);
    }
    
    // Atualiza estatísticas da campanha
    atualizarEstatisticasCampanha(
      depositosAgrupados[campanha],
      cpf,
      valorDeposito,
      primeiroDepositoPorCPF
    );
    
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
 * Atualiza as estatísticas de uma campanha com um novo depósito
 */
const atualizarEstatisticasCampanha = (
  dadosCampanha: DepositoData,
  cpf: string,
  valorDeposito: number,
  primeiroDepositoPorCPF: Map<string, boolean>
) => {
  if (cpf && !primeiroDepositoPorCPF.has(cpf)) {
    primeiroDepositoPorCPF.set(cpf, true); // Marca CPF como primeiro depósito
    dadosCampanha.ftd++; // Incrementa quantidade de FTDs
    dadosCampanha.ftd_amount += valorDeposito; // Incrementa valor total dos FTDs
  }
  
  dadosCampanha.transaction_value_quantidade++; // Incrementa quantidade total de transações
  dadosCampanha.transaction_value += valorDeposito; // Increment valor total das transações
};

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