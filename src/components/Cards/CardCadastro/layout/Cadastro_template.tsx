import React from "react";
import CardCadastro from "../CardCadastro";
import CardCusto_Cadastro from "../CardCusto_Cadastro";
import CardConversao_cadastro_ftd from "../CardConversao_Cadastro_Ftd";

// TODO: colocar mais no meio da tela como são 3 cards
const CadastroCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <CardCadastro />
      <CardCusto_Cadastro />
      <CardConversao_cadastro_ftd />
    </div>
  );
};

export default CadastroCards;
