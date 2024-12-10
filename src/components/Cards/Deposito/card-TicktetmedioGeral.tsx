import React from "react";
import CardGeneric from  "../card-Generic";

interface CardTicketMedioGeralProps {
TicketMedio?: number;
}
        
const CardTicketMedioGeral: React.FC<CardTicketMedioGeralProps> = ({ TicketMedio= 0 }) => {
return (
<CardGeneric
    // Mudar ICON:
    icon={
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <path
            fill="white"
            d="M2 7v7h1c1.19 0 2 .81 2 2s-.81 2-2 2H2v7h28v-7h-1c-1.19 0-2-.81-2-2s.81-2 2-2h1V7zm2 2h24v3.188c-1.715.45-3 1.955-3 3.812s1.285 3.362 3 3.813V23H4v-3.188c1.715-.45 3-1.955 3-3.812s-1.285-3.362-3-3.813z"
        />
    </svg>
    }
    color="#05fa7f"
    title="Ticket Médio (Geral)"
    value={TicketMedio}
    format="currency"
/>
);
};

export default CardTicketMedioGeral;
