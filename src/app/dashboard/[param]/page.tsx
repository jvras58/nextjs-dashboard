import Dashboard from "@/components/Dashboard/Dashboard";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";

export async function generateMetadata({ params }: { params: { param: string } }): Promise<Metadata> {
return {
    title: `Dashboard Afiliado: ${params.param}`,
    description: "Dashboard de afiliados da Betinha",
};
}

interface DashboardPageProps {
params: { param: string };
}

export default function DashboardDynamicPage({ params }: DashboardPageProps) {
const { param } = params;

return (
    <DefaultLayout>
    <Dashboard param={param} />
    </DefaultLayout>
);
}