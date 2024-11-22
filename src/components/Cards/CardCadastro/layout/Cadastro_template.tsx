import React from "react";
import CardCadastro from "../CardCadastro";
import CardCustoCadastro from "../CardCustoCadastro";
import CardConversaocadastroftd from "../CardConversaoCadastroFtd";

interface CadastroCardsProps {
  param?: string;
}


export default function CadastroCards({ param }: CadastroCardsProps) {
  return (
    <div className="flex justify-center">
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
      <CardCadastro param={param} />
      <CardCustoCadastro param={param} />
      <CardConversaocadastroftd param={param} />
    </div>
  </div>
  );
};

