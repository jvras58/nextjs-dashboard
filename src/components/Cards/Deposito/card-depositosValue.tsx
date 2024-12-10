import React from "react";
import CardGeneric from "../card-Generic";

interface CardDepositoValorProps {
    totalAmountDeposito?: number;
}

const CardDepositoValor: React.FC<CardDepositoValorProps> = ({ totalAmountDeposito = 0 }) => {
    return (
        <CardGeneric
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24">
                    <path
                        fill="white" 
                        d="M17.12 9.88a2.997 2.997 0 1 0-4.24 4.24a2.997 2.997 0 1 0 4.24-4.24M7 6v12h16V6zm14 8c-.53 0-1.04.21-1.41.59c-.38.37-.59.88-.59 1.41h-8c0-.53-.21-1.04-.59-1.41c-.37-.38-.88-.59-1.41-.59v-4c.53 0 1.04-.21 1.41-.59c.38-.37.59-.88.59-1.41h8c0 .53.21 1.04.59 1.41c.37.38.88.59 1.41.59zM5 8H3c-.55 0-1-.45-1-1s.45-1 1-1h2zm0 5H2c-.55 0-1-.45-1-1s.45-1 1-1h3zm0 5H1c-.552 0-1-.45-1-1s.448-1 1-1h4z"
                    />
                </svg>
            }
            color="#04bf8a"
            title="Depósitos (Valor)"
            value={totalAmountDeposito}
            format="currency"
        />
    );
};

export default CardDepositoValor;
