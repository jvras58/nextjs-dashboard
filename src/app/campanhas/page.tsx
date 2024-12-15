import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CampaignLinkGenerator from "@/components/Relatoria/CampaignLinkGenerator";

export const metadata: Metadata = {
  title: "Gerador de Campanha - Betinha",
  description: "Betinha Web",
};

const GeradorDeLinks = () => {
  return (
    <DefaultLayout HeaderTitle="Gerador de Links">
      <div className="flex flex-col items-center space-y-6">
        <h1 className="text-center text-4xl font-bold text-gray-900 dark:text-gray-100">
          Gerador de Links de Campanha
        </h1>
        <p className="text-center text-lg text-gray-600 dark:text-gray-400">
          Gere um Link de campanha
        </p>
        <CampaignLinkGenerator />
      </div>
    </DefaultLayout>
  );
};

export default GeradorDeLinks;
