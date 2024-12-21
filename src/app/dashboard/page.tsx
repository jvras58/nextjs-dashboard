import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AfiliadosList from "@/components/Cards/Afiliado/Afiliados-List";
import { Metadata } from "next";
import { nextAuthOptions } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Dashboards - Afiliados",
    description: "Dashboard da Betinha",
};

export default async function afiliadosDashAdmin() {
const session = await getServerSession(nextAuthOptions);
if (!session || session.user.role !== 'admin') { 
redirect("/");
}
return (
<DefaultLayout HeaderTitle="Afiliados">
    <AfiliadosList />
</DefaultLayout>
);
};
