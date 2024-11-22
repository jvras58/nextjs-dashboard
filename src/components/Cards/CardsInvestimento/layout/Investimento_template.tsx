import React from "react";
import CardTotalInvestido from "../CardTotalInvestimento";
import CardMedia_dia_investimento from "../CardMediaInvestimento";
import CardRoi from "../CardRoi";

const InvestimentoCards: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <CardTotalInvestido />
        <CardMedia_dia_investimento />
        <CardRoi />
      </div>
    </div>
  );
};

export default InvestimentoCards;