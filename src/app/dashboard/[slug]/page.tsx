import { Metadata } from "next";

import React from "react";
import CardsSection from "@/components/CardsSection";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import Card from "@/components/Card";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: `Dashboard Afiliado: ${params.slug}`,
    description: "Dashboard de afiliados da Betinha",
  };
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: Props) {
  return (
    <DashboardLayout title={(await params).slug}>
      <CardsSection title="Investimento">
        <Card title="teste" content={50} isCurrency />
        <Card title="teste" content={50} isPercentage />
        <Card title="teste" content={50} />
      </CardsSection>
      <CardsSection title="GGR" />
      <CardsSection title="Cadastro" />
      <CardsSection title="Depósito" />
    </DashboardLayout>
  );
}
