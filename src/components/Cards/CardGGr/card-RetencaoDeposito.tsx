import React from "react";
import CardGeneric from "../card-Generic";

interface CardRetencaoDepositoProps {
  taxaRetencao?: string;
}

const CardRetencaoDeposito: React.FC<CardRetencaoDepositoProps> = ({ taxaRetencao = "0%" }) => {

  return (
    <CardGeneric
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 32 32">
          <path
            fill="white"
            d="M5 5v22h22V5zm2 2h18v18H7zm5 2c-1.645 0-3 1.355-3 3v1c0 1.645 1.355 3 3 3s3-1.355 3-3v-1c0-1.645-1.355-3-3-3m7.594 0L10 23h2.406L22 9zM12 11c.566 0 1 .434 1 1v1c0 .566-.434 1-1 1s-1-.434-1-1v-1c0-.566.434-1 1-1m8 5c-1.645 0-3 1.355-3 3v1c0 1.645 1.355 3 3 3s3-1.355 3-3v-1c0-1.645-1.355-3-3-3m0 2c.566 0 1 .434 1 1v1c0 .566-.434 1-1 1s-1-.434-1-1v-1c0-.566.434-1 1-1"
          />
        </svg>
      }
      color="#18BFFF"
      title="Taxa Retenção Deposito"
      value={taxaRetencao}
      format="percent"
    />
  );
};

export default CardRetencaoDeposito;
