import React from "react";
import CardCadastro from "../CardCadastro";
import CardCusto_Cadastro from "../CardCusto_Cadastro";
import CardConversao_cadastro_ftd from "../CardConversao_Cadastro_Ftd";


const CadastroCards: React.FC = () => {
  return (
    <div className="flex justify-center">
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
      <CardCadastro />
      <CardCusto_Cadastro />
      <CardConversao_cadastro_ftd />
    </div>
  </div>
  );
};

export default CadastroCards;
