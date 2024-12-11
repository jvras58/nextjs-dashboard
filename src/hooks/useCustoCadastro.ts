import useTotalInvestido from '@/hooks/useTotalInvestido';
import useTotalCadastro from '@/hooks/useTotalCadastro';
import { useState } from "react";

// Cálculo do CUSTO DE CADASTRO:
// totalInvestido(Total Investido (Dia)) / totalCadastro(Cadastros)

interface CustoCadastroResult {
  data: number | null;
  isLoading: boolean;
  error: Error | null;
}

const useCustoCadastro = (param: string, startingDate: Date | undefined, endingDate: Date | undefined): CustoCadastroResult => {
  const [totalInestidoData, totalInvestidoIsLoading, totalInvestidoError] = useTotalInvestido(param, startingDate, endingDate);
  const [totalCadastroData, totalCadastroIsLoading, totalCadastroError ] = useTotalCadastro(param, startingDate, endingDate);

  if (totalInvestidoError || totalCadastroError) {
    return {
      data: null,
      isLoading: false,
      error: totalInvestidoError || totalCadastroError
    };
  }

  if (totalInvestidoIsLoading || totalCadastroIsLoading) {
    return {
      data: null,
      isLoading: true,
      error: null
    };
  }

  if (!totalInestidoData || !totalCadastroData || totalCadastroData === 0) {
    return {
      data: null,
      isLoading: false,
      error: null
    };
  }

  return {
    data: totalInestidoData / totalCadastroData,
    isLoading: false,
    error: null
  };
};

export default useCustoCadastro;