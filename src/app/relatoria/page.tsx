import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import InputBox from "@/components/Relatoria/input-box";

export const metadata: Metadata = {
  title: "Relatório - Betinha",
  description: "Betinha Web",
};

const Relatoria = () => {
  return (
    <DefaultLayout HeaderTitle="Relatório">
      <div className="flex flex-col items-center space-y-6">
        <h1 className="text-center text-4xl font-bold text-gray-900 dark:text-gray-100">
          Relatório
        </h1>
        <p className="text-center text-lg text-gray-600 dark:text-gray-400">
          Registro de ID da planilha para relatórios
        </p>
        <InputBox />
      </div>
    </DefaultLayout>
  );
};

export default Relatoria;
