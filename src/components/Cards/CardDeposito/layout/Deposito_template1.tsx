import React from "react";
import CardFTD_Qntd from "../1/CardFTD_Qntd";
import CardFTD_amount from "../1/CardFTD_amount";
import CardCustoFTD from "../1/CardCustoFTD";
import CardTicketMedioFTD from "../1/CardTicktet_medioFTD";

const DepositoCards1: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <CardFTD_Qntd />
      <CardFTD_amount />
      <CardCustoFTD />
      <CardTicketMedioFTD />
    </div>
  );
};

export default DepositoCards1;
