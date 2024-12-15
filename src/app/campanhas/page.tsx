import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CampaignLinkGenerator from "@/components/Relatoria/CampaignLinkGenerator";
import MapOne from "@/components/Maps/MapOne";
import CampaignTable from "@/components/Tables/Campanha-Table";
import EstadoTable from "@/components/Tables/Estado-Table";
import DepositoFTDTable from "@/components/Tables/DepositoFTD-Table";

export const metadata: Metadata = {
  title: "Gerador de Campanha - Betinha",
  description: "Betinha Web",
};

const LayoutWrapper = ({ children, layoutClass }: { children: React.ReactNode; layoutClass: string }) => {
  return <div className={layoutClass}>{children}</div>;
};

const GeradorDeLinks = () => {
  return (
    <DefaultLayout HeaderTitle="Gerador de Links">
      {/* Seção Gerador de Links */}
      <div className="flex flex-col items-center space-y-6">
        <h1 className="text-center text-4xl font-bold text-gray-900 dark:text-gray-100">
          Gerador de Links de Campanha
        </h1>
        <p className="text-center text-lg text-gray-600 dark:text-gray-400">
          Gere um Link de campanha
        </p>
        <CampaignLinkGenerator />
      </div>

      {/* Seção Cadastro */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-6">Cadastro</h2>
        <div className="grid grid-cols-12 gap-6 mt-6">
          <LayoutWrapper layoutClass="col-span-12 xl:col-span-7">
            {/* TODO: Vai pegar esse parametro do Usuario Autenticado */}
            <CampaignTable param="affbr" />
          </LayoutWrapper>
          <LayoutWrapper layoutClass="col-span-12 xl:col-span-5">
            {/* TODO: Vai pegar esse parametro do Usuario Autenticado */}
            <EstadoTable param="affbr" />
          </LayoutWrapper>
          <LayoutWrapper layoutClass="col-span-12">
          <div className="map-container">
            <MapOne param="affbr"/>
          </div>
          </LayoutWrapper>
        </div>
      </div>

      {/* Seção Depósito */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-6">Depósito</h2>
        <div className="grid grid-cols-12">
          <LayoutWrapper layoutClass="col-span-12">
            {/* TODO: Vai pegar esse parametro do Usuario Autenticado */}
            <DepositoFTDTable param="affbr" />
          </LayoutWrapper>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default GeradorDeLinks;