"use client";
import React, { useMemo } from "react";
import CardTotalInvestido from "@/components/Cards/CardsInvestimento/card-TotalInvestimento";
import CardMediaDiaInvestimento from "@/components/Cards/CardsInvestimento/card-MediaInvestimento";
import CardRoi from "@/components/Cards/CardsInvestimento/card-Roi";
import MapOne from "@/components/Maps/MapOne";
import CampaignTable from "@/components/Tables/Campanha-Table";
import EstadoTable from "@/components/Tables/Estado-Table";
import DepositoFTDTable from "@/components/Tables/DepositoFTD-Table";
import TotalApostado from "@/components/Cards/CardGGr/card-TotalApostado";
import CardTotalPremios from "@/components/Cards/CardGGr/card-TotalPremios";
import CardGGR from "@/components/Cards/CardGGr/card-Ggr";
import CardRetencaoDeposito from "@/components/Cards/CardGGr/card-RetencaoDeposito";
import CardCadastro from "@/components/Cards/Cadastro/card-cadastro";
import CardCustoCadastro from "@/components/Cards/Cadastro/card-custocadastro";
import CardConversaocadastroftd from "@/components/Cards/Cadastro/card-conversaocadastroFtd";
import CardFtdqntd from "@/components/Cards/Deposito/card-Ftdqntd";
import CardFtdamount from "@/components/Cards/Deposito/card-AmountFtd";
import CardCustoFTD from "@/components/Cards/Deposito/card-custoFtd";
import CardTicketMedioFTD from "@/components/Cards/Deposito/card-TicktetmedioFtd";
import CardQntdDeposito from "@/components/Cards/Deposito/card-depositoqntd";
import CardDepositoValor from "@/components/Cards/Deposito/card-depositosValue";
import CardReDeposito from "@/components/Cards/Deposito/card-TaxaReDeposito";
import CardTicketMedioGeral from "@/components/Cards/Deposito/card-TicktetmedioGeral";
import useCadastroData from "@/hooks/useCadastroData";

interface DashboardProps {
  param?: string;
}

export default function Dashboard({ param }: DashboardProps) {
  const { data = [] } = useCadastroData("cadastro", param || "");

  const sectionsConfig = useMemo(() => [
    {
      title: "Investimento",
      cards: [
        { component: CardTotalInvestido, props: {} },
        { component: CardMediaDiaInvestimento, props: {} },
        { component: CardRoi, props: {} },
      ],
      tables: [],
    },
    {
      title: "GGR",
      cards: [
        { component: TotalApostado, props: {} },
        { component: CardTotalPremios, props: {} },
        { component: CardGGR, props: {} },
        { component: CardRetencaoDeposito, props: {} },
      ],
      tables: [],
    },
    {
      title: "Cadastro",
      cards: [
        { component: CardCadastro, props: { userCount: data.length } },
        { component: CardCustoCadastro, props: { param: param || "" } },
        { component: CardConversaocadastroftd, props: { param: param || "" } },
      ],
      tables: [
        { component: CampaignTable, props: {} },
        { component: EstadoTable, props: { param } },
        { component: MapOne, props: {} },
      ],
    },
    {
      title: "Depósito",
      cards: [
        { component: CardFtdqntd, props: {} },
        { component: CardFtdamount, props: {} },
        { component: CardCustoFTD, props: {} },
        { component: CardTicketMedioFTD, props: {} },
      ],
      tables: [],
    },
    {
      title: "",
      cards: [
        { component: CardQntdDeposito, props: {} },
        { component: CardDepositoValor, props: {} },
        { component: CardReDeposito, props: {} },
        { component: CardTicketMedioGeral, props: {} },
      ],
      tables: [{ component: DepositoFTDTable, props: {} }],
    },
  ], [data, param]);

  if (!data.length) return <div>Loading...</div>;

  return (
    <>
      {sectionsConfig.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          {section.title && (
            <div className="flex justify-center items-center mb-6">
              <h2 className="text-heading-2 dark:text-white font-bold p-2">{section.title}</h2>
            </div>
          )}
          <div className="flex justify-center mb-12">
            <div className={`grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-${section.cards.length > 3 ? 4 : 3} 2xl:gap-7.5`}>
              {section.cards.map((cardConfig, cardIndex) => {
                const CardComponent = cardConfig.component;
                return <CardComponent key={cardIndex} {...cardConfig.props} />;
              })}
            </div>
          </div>
          {section.tables.length > 0 && (
            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5 mb-12">
              {section.tables.map((tableConfig, tableIndex) => {
                const TableComponent = tableConfig.component;
                return (
                  <div key={tableIndex} className="col-span-12 xl:col-span-7">
                    <TableComponent {...tableConfig.props} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </>
  );
}
