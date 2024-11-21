"use client";
import React from "react";
import DataStatsOne from "@/components/DataStats/DataStatsOne";
import MapOne from "@/components/Maps/MapOne";
import CampaignTable from "@/components/Tables/CampanhaTable";
import EstadoTable from "@/components/Tables/EstadoTable";
import DepositoFTDTable from "@/components/Tables/DepositoFTDTable";

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="flex justify-center items-center mb-6">
        <h2 className="text-heading-2 dark:text-white">Investimento</h2>
      </div>
      <DataStatsOne />

      <div className="flex justify-center items-center mb-6">
        <h2 className="text-heading-2 dark:text-white">GGR</h2>
      </div>
      <DataStatsOne />

      <div className="flex justify-center items-center mb-6">
        <h2 className="text-heading-2 dark:text-white">Cadastro</h2>
      </div>
      <DataStatsOne />

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-7">
          <CampaignTable />
        </div>
        <EstadoTable />
        <div className="col-span-12 flex justify-center items-center min-h-[400px]">
          <MapOne />
        </div>
      </div>
        
      <div className="flex justify-center items-center mb-6">
        <h2 className="text-heading-2 dark:text-white">Depósito</h2>
      </div>
      <div id="1" className="mb-6">
        <DataStatsOne />
      </div>
      <div id="2" className="mb-12 text-heading-2">
        <DataStatsOne />
      </div>

      <div className="col-span-12 xl:col-span-8">
        <DepositoFTDTable />
      </div>
    </>
  );
};

export default Dashboard;