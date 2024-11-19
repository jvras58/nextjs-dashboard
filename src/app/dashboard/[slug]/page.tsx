import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

import React from "react";

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
  return <DefaultLayout>oi</DefaultLayout>;
}
