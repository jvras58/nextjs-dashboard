import React from "react";
import CardGeneric from "../../CardGeneric";

const CardFTD_Amount: React.FC = () => {
return (
<CardGeneric
    // Mudar ICON:
    icon={
    <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <ellipse cx="9.75106" cy="6.49984" rx="4.33333" ry="4.33333" fill="white" />
        <ellipse cx="9.75106" cy="18.4178" rx="7.58333" ry="4.33333" fill="white" />
        <path
        d="M22.7496 18.4173C22.7496 20.2123 20.5445 21.6673 17.8521 21.6673C18.6453 20.8003 19.1907 19.712 19.1907 18.4189C19.1907 17.1242 18.644 16.0349 17.8493 15.1674C20.5417 15.1674 22.7496 16.6224 22.7496 18.4173Z"
        fill="white"
        />
        <path
        d="M19.4996 6.50098C19.4996 8.2959 18.0446 9.75098 16.2496 9.75098C15.8582 9.75098 15.483 9.68179 15.1355 9.55498C15.648 8.65355 15.9407 7.61084 15.9407 6.49977C15.9407 5.38952 15.6484 4.34753 15.1366 3.44656C15.4838 3.32001 15.8587 3.25098 16.2496 3.25098C18.0446 3.25098 19.4996 4.70605 19.4996 6.50098Z"
        fill="white"
        />
    </svg>
    }
    color="#18BFFF"
    title="FTD Amount"
    // tratamento para valores de money
    value="R$12.57"
    growthRate={-0.95}
/>
);
};

export default CardFTD_Amount;
