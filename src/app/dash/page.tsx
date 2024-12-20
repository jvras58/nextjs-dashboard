import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Dashboard from "@/components/Dashboard/Dashboard";
import React from "react";

// TODO: Estou aqui:
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

const userParams = async () => {
    return { slug: "DKC" };
  };

export default async function Page({ params = userParams() }: Props) {
return (
<DefaultLayout HeaderTitle={(await params).slug}>
    <Dashboard param={(await params).slug}></Dashboard>
</DefaultLayout>
);
}