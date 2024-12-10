import React from "react";
import CardGeneric from "../card-Generic";

interface CardFTDAmountProps {
    totalAmountFtd?: number;
}

const CardFTDAmount: React.FC<CardFTDAmountProps> = ({ totalAmountFtd = 0 }) => {
    return (
        <CardGeneric
            // Novo ícone com stroke e currentColor para usar a cor do CardGeneric
            icon={
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="56"
                    height="56"
                    viewBox="0 0 16 16"
                    fill="none"
                >
                    <path
                        fill="none"
                        stroke="white"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        d="M6 10h2.5c.55 0 1-.45 1-1s-.45-1-1-1h-1c-.55 0-1-.45-1-1s.45-1 1-1H10M8 4.5v1.167M8 9.5v2M14.5 8a6.5 6.5 0 1 1-13 0a6.5 6.5 0 0 1 13 0Z"
                    />
                </svg>
            }
            color="#34eb8f"
            title="FTD Amount"
            value={totalAmountFtd}
            format="currency"
        />
    );
};

export default CardFTDAmount;
