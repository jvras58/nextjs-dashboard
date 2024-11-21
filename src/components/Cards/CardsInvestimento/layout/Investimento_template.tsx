import React from "react";
import CardTotalInvestido from "../CardTotalInvestimento";
import CardMedia_dia_investimento from "../CardMediaInvestimento";
import CardRoi from "../CardRoi";

// TODO: colocar mais no meio da tela como são 3 cards
const InvestimentoCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <CardTotalInvestido />
      <CardMedia_dia_investimento />
      <CardRoi />
    </div>
  );
};

export default InvestimentoCards;
