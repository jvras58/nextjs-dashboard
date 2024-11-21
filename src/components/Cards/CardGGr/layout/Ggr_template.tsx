import React from "react";
import CardGGR from "../CardGgr";
import TotalApostado from "../CardTotalApostado";
import CardTotalPremios from "../CardTotalPremios";
import CardRetencaoDeposito from "../CardRetencaoDeposito";


const GgrCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <CardGGR />
      <TotalApostado />
      <CardTotalPremios />
      <CardRetencaoDeposito />
    </div>
  );
};

export default GgrCards;
