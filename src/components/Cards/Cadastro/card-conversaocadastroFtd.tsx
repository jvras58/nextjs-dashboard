import React from "react";
import CardGeneric from "../card-Generic";

interface CardConversaoCadastroProps {
    ConversaoCadastroFTD?: string;
    }
    
export default function CardConversaoCadastro({ ConversaoCadastroFTD= "0%" }: CardConversaoCadastroProps) {
return (
<CardGeneric
    icon={
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24">
          <g fill="none">
            <path d="M0 0h24v24H0z"/>
            <path fill="white" d="M13.5 4a1.5 1.5 0 0 0-3 0v.5h-1a4.5 4.5 0 0 0 0 9h5a1.5 1.5 0 0 1 0 3H7a1.5 1.5 0 0 0 0 3h3.5v.5a1.5 1.5 0 0 0 3 0v-.5h1a4.5 4.5 0 1 0 0-9h-5a1.5 1.5 0 1 1 0-3H17a1.5 1.5 0 0 0 0-3h-3.5z"/>
          </g>
        </svg>
      }
    color="#5F3384"
    title="Conversão Cadastro / FTD"
    value={ConversaoCadastroFTD}
    format="percent"
/>
);
};

