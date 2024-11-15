import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";


import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Betinha tabelas",
  description: "Tabelas de afiliados",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tabelas" />

      <div className="flex flex-col gap-10">
        <TableOne />
        <TableThree />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
