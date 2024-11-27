"use client";
import React from "react";
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

interface DashboardProps {
  param?: string;
}

export default function Dashboard({ param }: DashboardProps) {
  return (
    <>
      <div className="flex justify-center items-center mb-6">
        <h2 className="text-heading-2 dark:text-white font-bold p-2">Investimento</h2>
      </div>
      <div className="flex justify-center mb-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
          <CardTotalInvestido />
          <CardMediaDiaInvestimento />
          <CardRoi />
        </div>
      </div>

      <div className="flex justify-center items-center mb-6">
        <h2 className="text-heading-2 dark:text-white font-bold p-2">GGR</h2>
      </div>
      <div className="flex justify-center mb-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <TotalApostado />
          <CardTotalPremios />
          <CardGGR />
          <CardRetencaoDeposito />
        </div>
      </div>

      <div className="flex justify-center items-center mb-6">
        <h2 className="text-heading-2 dark:text-white font-bold p-2">Cadastro</h2>
      </div>
      <div className="flex justify-center mb-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
          <CardCadastro param={param} />
          <CardCustoCadastro param={param} />
          <CardConversaocadastroftd param={param} />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5 mb-12">
        <div className="col-span-12 xl:col-span-7">
          <CampaignTable />
        </div>
        <EstadoTable param={param} />
        <div className="col-span-12 flex justify-center items-center min-h-[400px]">
          <MapOne />
        </div>
      </div>
        
      <div className="flex justify-center items-center mb-6">
        <h2 className="text-heading-2 dark:text-white font-bold p-2">Depósito</h2>
      </div>
      <div className="flex justify-center mb-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <CardFtdqntd />
          <CardFtdamount />
          <CardCustoFTD />
          <CardTicketMedioFTD />
        </div>
      </div>

      <div className="flex justify-center mb-12 text-heading-2">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <CardQntdDeposito />
          <CardDepositoValor />
          <CardReDeposito />
          <CardTicketMedioGeral />
        </div>
      </div>

      <div className="col-span-12 xl:col-span-8">
        <DepositoFTDTable />
      </div>
    </>
  );
}