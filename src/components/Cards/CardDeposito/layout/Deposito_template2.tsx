import React from "react";
import CardQntd_Deposito from "../2/CardQntd_Deposito";
import CardDepositoValor from "../2/CardDepositos_value";
import CardReDeposito from "../2/CardTaxa_re_deposito";
import CardTicketMedioGeral from "../2/CardTicktet_medioGeral";


const DepositoCards2: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <CardQntd_Deposito />
      <CardDepositoValor />
      <CardReDeposito />
      <CardTicketMedioGeral />
    </div>
  );
};

export default DepositoCards2;
