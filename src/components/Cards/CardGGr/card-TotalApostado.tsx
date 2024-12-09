import React from "react";
import CardGeneric from "../card-Generic";

interface CardTotalApostaProps {
  totalApostado?: number;
}

const TotalApostado: React.FC<CardTotalApostaProps> = ({ totalApostado = 0 }) => {
  return (
    <CardGeneric
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <g fill="none" fillRule="evenodd">
            <path
              d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"
              fill="white"
            />
            <path
              fill="white"
              d="M2 9a5 5 0 0 1 5-5h10a5 5 0 0 1 5 5v6a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5zm2 2v4a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-4h-3a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2zm0-2a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3z"
            />
          </g>
        </svg>
      }
      color="#9c988b"
      title="Total Apostado"
      value={totalApostado}
      format="currency"
    />
  );
};

export default TotalApostado;
