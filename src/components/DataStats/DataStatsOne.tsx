import React from "react";
import { dataStats } from "@/types/dataStats";
import useFetchData from "@/hooks/useFetchData";
import useFetchAndSum from "@/hooks/useFetchAndSum";
import DataCard from "./DataCard";

const DataStatsOne: React.FC<dataStats> = ({ param }) => {
  const { data: usefetchdata, loading: usefetchloading, error: usefetcherror } = useFetchData("cadastro", param);

  const { total, loading: sumLoading, error: useFetchAndSumerror } = useFetchAndSum(
    "deposito",
    "affiliate",
    param,
    "transaction_value"
  );

  if (sumLoading || usefetchloading) {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[1, 2].map((_, index) => (
                <div key={index} className="animate-pulse bg-gray-500 h-20 rounded-md"></div>
            ))}
        </div>
    );
}

  if (usefetcherror || useFetchAndSumerror) {
    return <div>Erro ao carregar os dados: {usefetcherror?.message || useFetchAndSumerror?.message}</div>;
  }

  const dataStatsList = [
    {
      icon: (
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="9.75" cy="6.5" rx="4.33" ry="4.33" fill="white" />
          <ellipse cx="9.75" cy="18.42" rx="7.58" ry="4.33" fill="white" />
          <path
            d="M22.75 18.42C22.75 20.21 20.54 21.67 17.85 21.67C18.64 20.8 19.19 19.71 19.19 18.42C19.19 17.12 18.64 16.03 17.85 15.17C20.54 15.17 22.75 16.62 22.75 18.42Z"
            fill="white"
          />
          <path
            d="M19.5 6.5C19.5 8.3 18.04 9.75 16.25 9.75C15.86 9.75 15.48 9.68 15.14 9.55C15.65 8.65 15.94 7.61 15.94 6.5C15.94 5.39 15.65 4.35 15.14 3.45C15.48 3.32 15.86 3.25 16.25 3.25C18.04 3.25 19.5 4.71 19.5 6.5Z"
            fill="white"
          />
        </svg>
      ),
      color: "#18BFFF",
      title: "Total Afiliados",
      value: usefetchdata.length.toString(),
    },
    {
      icon: (
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13 23.8332C18.983 23.8332 23.8333 18.9829 23.8333 12.9998C23.8333 7.01675 18.983 2.1665 13 2.1665C7.01687 2.1665 2.16663 7.01675 2.16663 12.9998C2.16663 18.9829 7.01687 23.8332 13 23.8332ZM13.8125 6.49984C13.8125 6.05111 13.4487 5.68734 13 5.68734C12.5512 5.68734 12.1875 6.05111 12.1875 6.49984V6.84297C10.4212 7.15923 8.93746 8.48625 8.93746 10.2915C8.93746 12.3684 10.9013 13.8123 13 13.8123C14.4912 13.8123 15.4375 14.7935 15.4375 15.7082C15.4375 16.6228 14.4912 17.604 13 17.604C11.5088 17.604 10.5625 16.6228 10.5625 15.7082C10.5625 15.2594 10.1987 14.8957 9.74996 14.8957C9.30123 14.8957 8.93746 15.2594 8.93746 15.7082C8.93746 17.5134 10.4212 18.8404 12.1875 19.1567V19.4998C12.1875 19.9486 12.5512 20.3123 13 20.3123C13.4487 20.3123 13.8125 19.9486 13.8125 19.4998V19.1567C15.5788 18.8404 17.0625 17.5134 17.0625 15.7082C17.0625 13.6313 15.0986 12.1873 13 12.1873C11.5088 12.1873 10.5625 11.2061 10.5625 10.2915C10.5625 9.37688 11.5088 8.39567 13 8.39567C14.4912 8.39567 15.4375 9.37688 15.4375 10.2915C15.4375 10.7402 15.8012 11.104 16.25 11.104C16.6987 11.104 17.0625 10.7402 17.0625 10.2915C17.0625 8.48625 15.5788 7.15923 13.8125 6.84297V6.49984Z"
            fill="white"
          />
        </svg>
      ),
      color: "#FF9C55",
      title: "Valor Total de Depósitos",
      value: `R$ ${total.toFixed(2)}`,
    },
  ];

    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          {dataStatsList.map((item, index) => (
              <DataCard key={index} {...item} />
          ))}
      </div>
  );
};

export default DataStatsOne;
