import Relatoria from "@/components/Relatoria";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Relatório - Betinha",
  description: "Betinha Web",
};

const Page = () => {
  return <Relatoria />;
};

export default Page;
