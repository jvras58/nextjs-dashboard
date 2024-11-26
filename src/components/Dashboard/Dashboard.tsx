"use client";
import React from "react";
import CardTotalInvestido from "@/components/Cards/CardsInvestimento/CardTotalInvestimento";
import CardMedia_dia_investimento from "@/components/Cards/CardsInvestimento/CardMediaInvestimento";
import CardRoi from "@/components/Cards/CardsInvestimento/CardRoi";
import MapOne from "@/components/Maps/MapOne";
import CampaignTable from "@/components/Tables/CampanhaTable";
import EstadoTable from "@/components/Tables/EstadoTable";
import DepositoFTDTable from "@/components/Tables/DepositoFTDTable";
import TotalApostado from "@/components/Cards/CardGGr/CardTotalApostado";
import CardTotalPremios from "@/components//Cards/CardGGr/CardTotalPremios";
import CardGGR from "@/components//Cards/CardGGr/CardGgr";
import CardRetencaoDeposito from "@/components//Cards/CardGGr/CardRetencaoDeposito";
import CardCadastro from "@/components//Cards/CardCadastro/CardCadastro";
import CardCustoCadastro from "@/components//Cards/CardCadastro/CardCustoCadastro";
import CardConversaocadastroftd from "@/components//Cards/CardCadastro/CardConversaoCadastroFtd";
import CardFTD_Qntd from "@/components//Cards/CardDeposito/CardFTD_Qntd";
import CardFTD_amount from "@/components//Cards/CardDeposito/CardFTD_amount";
import CardCustoFTD from "@/components//Cards/CardDeposito/CardCustoFTD";
import CardTicketMedioFTD from "@/components//Cards/CardDeposito/CardTicktet_medioFTD";
import CardQntd_Deposito from "@/components//Cards/CardDeposito/CardQntd_Deposito";
import CardDepositoValor from "@/components//Cards/CardDeposito/CardDepositos_value";
import CardReDeposito from "@/components//Cards/CardDeposito/CardTaxa_re_deposito";
import CardTicketMedioGeral from "@/components//Cards/CardDeposito/CardTicktet_medioGeral";

interface DashboardProps {
  param?: string;
}

export default function Dashboard({ param }: DashboardProps) {
  return (
    <>
      <div className="flex justify-center items-center mb-6">
        <h2 className="text-heading-2 dark:text-white">Investimento</h2>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
          <CardTotalInvestido />
          <CardMedia_dia_investimento />
          <CardRoi />
        </div>
      </div>

      <div className="flex justify-center items-center mb-6">
        <h2 className="text-heading-2 dark:text-white">GGR</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <TotalApostado />
        <CardTotalPremios />
        <CardGGR />
        <CardRetencaoDeposito />
      </div>

      <div className="flex justify-center items-center mb-6">
        <h2 className="text-heading-2 dark:text-white">Cadastro</h2>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
          <CardCadastro param={param} />
          <CardCustoCadastro param={param} />
          <CardConversaocadastroftd param={param} />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-7">
          <CampaignTable />
        </div>
        <EstadoTable param={param} />
        <div className="col-span-12 flex justify-center items-center min-h-[400px]">
          <MapOne />
        </div>
      </div>
        
      <div className="flex justify-center items-center mb-6">
        <h2 className="text-heading-2 dark:text-white">Depósito</h2>
      </div>
      <div className="mb-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardFTD_Qntd />
        <CardFTD_amount />
        <CardCustoFTD />
        <CardTicketMedioFTD />
      </div>
      </div>

      <div className="mb-12 text-heading-2">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardQntd_Deposito />
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