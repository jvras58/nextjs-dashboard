import React from "react";
import CardGeneric from "../card-Generic";

interface CardDepositoQtdProps {
    totalDeposito?: number;
}

const CardDepositoQntd: React.FC<CardDepositoQtdProps> = ({ totalDeposito = 0 }) => {
    return (
        <CardGeneric
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 16 16">
                    <path
                        fill="white" 
                        d="m8 16l-2-3h1v-2h2v2h1zm7-15v8H1V1zm1-1H0v10h16z"
                    />
                    <path
                        fill="white"
                        d="M8 2a3 3 0 1 1 0 6h5V7h1V3h-1V2zM5 5a3 3 0 0 1 3-3H3v1H2v4h1v1h5a3 3 0 0 1-3-3"
                    />
                </svg>
            }
            color="#05fab5" 
            title="Depósito Quantidade"
            value={totalDeposito}
        />
    );
};

export default CardDepositoQntd;
