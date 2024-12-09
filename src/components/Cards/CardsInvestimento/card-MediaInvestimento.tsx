import React from "react";
import CardGeneric from "../card-Generic";


interface CardMediaInvestimentoProps {
    MediaInvestida?: number;
}

const CardMedia_dia_investimento: React.FC<CardMediaInvestimentoProps> = ({ MediaInvestida= 0 }) => {
return (
<CardGeneric
    icon={
    <svg
        className="w-6 h-6 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
    >
        <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 15v4m6-6v6m6-4v4m6-6v6M3 11l6-5 6 5 5.5-5.5"
        />
    </svg>
    }
    color="#18BFFF"
    title="Média / Dia"
    value={MediaInvestida}
    format="currency"
/>
);
};

export default CardMedia_dia_investimento;