import React from "react";
import CardGeneric from "../card-Generic";

interface CardTotalPremiosProps {
    totalPremios?: number;
}

const CardTotalPremios: React.FC<CardTotalPremiosProps> = ({ totalPremios= 0 }) => {
return (
<CardGeneric
    icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <g fill="none" fillRule="evenodd">
            <path
              d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
              fill="white"
            />
            <path
              fill="white"
              d="M8.667 2c1.34 0 2.538.608 3.333 1.564A4.32 4.32 0 0 1 15.333 2h.067A2.6 2.6 0 0 1 18 4.6c0 .5-.108.973-.3 1.4h.3a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h.3c-.192-.427-.3-.9-.3-1.4A2.6 2.6 0 0 1 8.6 2zM19 14h-6v5h5a1 1 0 0 0 .993-.883L19 18zm-8 0H5v4a1 1 0 0 0 1 1h5zm0-6H6a1 1 0 0 0-.993.883L5 9v3h6zm7 0h-5v4h6V9a1 1 0 0 0-1-1M8.667 4H8.6a.6.6 0 0 0-.6.6A1.4 1.4 0 0 0 9.4 6h1.576a2.334 2.334 0 0 0-2.31-2M15.4 4h-.067c-1.12 0-2.055.788-2.28 1.84l-.03.16H14.6A1.4 1.4 0 0 0 16 4.6a.6.6 0 0 0-.503-.592z"
            />
          </g>
        </svg>
      }
    color="#18ffbf"
    title="Total Prêmios"
    value={totalPremios}
    format="currency"
/>
);
};

export default CardTotalPremios;
