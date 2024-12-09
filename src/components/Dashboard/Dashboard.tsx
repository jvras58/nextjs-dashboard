"use client";
import React, { use, useMemo } from "react";
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

import Loader from "../common/Loader";

import useDashboardData from "@/hooks/useDashboardData";
import DateRangePicker from "@/components/Dashboard/DateRangePicker";

interface DashboardProps {
  param?: string;
}

export default function Dashboard({ param }: DashboardProps) {
  const { 
    cadastroData,
    totalInvestido,
    totalApostado,
    totalPremios,
    totalFtd,
    totalAmountFtd,
    totalDeposito,
    totalAmountDeposito,
    totalGgr,
    loading 
  } = useDashboardData(param || "");



  const sectionsConfig = useMemo(() => [
    {
      title: "Investimento",
      cards: [
        { component: CardTotalInvestido, props: { totalInvestido: totalInvestido ?? 0 } },
        { component: CardMediaDiaInvestimento, props: {} },
        { component: CardRoi, props: {} },
      ],
      tables: [],
    },
    {
      title: "GGR",
      cards: [
        { component: TotalApostado, props: {totalApostado: totalApostado ?? 0} },
        { component: CardTotalPremios, props: {totalPremios: totalPremios ?? 0} },
        { component: CardGGR, props: {totalGgr: totalGgr ?? 0} },
        { component: CardRetencaoDeposito, props: {} },
      ],
      tables: [],
    },
    {
      title: "Cadastro",
      cards: [
        { component: CardCadastro, props: { userCount: cadastroData.length } },
        { component: CardCustoCadastro, props: { param: param || "" } },
        { component: CardConversaocadastroftd, props: { param: param || "" } },
      ],
      tables: [
        { 
          component: CampaignTable, 
          props: { param }, 
          layout: "col-span-12 xl:col-span-7" // Tabela maior na esquerda
        },
        { 
          component: EstadoTable, 
          props: { param }, 
          layout: "col-span-12 xl:col-span-5" // Tabela menor na direita
        },
        { 
          component: MapOne, 
          props: {}, 
          layout: "col-span-12 flex justify-center items-center min-h-[400px]" // Mapa ocupa toda a largura
        },
      ],
    },
    {
      title: "Depósito",
      cards: [
        { component: CardFtdqntd, props: {totalFtd: totalFtd ?? 0} },
        { component: CardFtdamount, props: {totalAmountFtd: totalAmountFtd ?? 0} },
        { component: CardCustoFTD, props: {} },
        { component: CardTicketMedioFTD, props: {} },
      ],
      tables: [],
    },
    {
      title: "",
      cards: [
        { component: CardQntdDeposito, props: {totalDeposito: totalDeposito?? 0} },
        { component: CardDepositoValor, props: {totalAmountDeposito: totalAmountDeposito?? 0} },
        { component: CardReDeposito, props: {} },
        { component: CardTicketMedioGeral, props: {} },
      ],
      tables: [
        { 
          component: DepositoFTDTable, 
          props: { param }, 
          layout: "col-span-12" // Tabela no final
        },
      ],
    },
  ], [cadastroData, totalInvestido, totalApostado, totalPremios, totalFtd, totalAmountFtd, totalDeposito, totalAmountDeposito, param]);

  if (loading) {
    return <Loader />;
    }

  return (
    <>
      <div className="flex justify-end mb-6 px-7.5">
        <DateRangePicker />
      </div>
      {sectionsConfig.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          {/* Título da seção */}
          {section.title && (
            <div className="flex justify-center items-center mb-6">
              <h2 className="text-heading-2 dark:text-white font-bold p-2">{section.title}</h2>
            </div>
          )}

          {/* Renderização dos cards */}
          {section.cards.length > 0 && (
            <div className="flex justify-center mb-12">
              <div
                className={`grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-${section.cards.length > 3 ? 4 : 3} 2xl:gap-7.5`}
              >
                {section.cards.map((cardConfig, cardIndex) => {
                  const CardComponent = cardConfig.component;
                  return <CardComponent key={cardIndex} {...cardConfig.props} />;
                })}
              </div>
            </div>
          )}

          {/* Renderização das tabelas */}
          {section.tables.length > 0 && (
            <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5 mb-12">
              {section.tables.map((tableConfig, tableIndex) => {
                const TableComponent = tableConfig.component;
                const layoutClass = tableConfig.layout || "col-span-12"; // Classe padrão
                return (
                  <div key={tableIndex} className={layoutClass}>
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