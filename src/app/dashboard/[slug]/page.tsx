import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Dashboard from "@/components/Dashboard/Dashboard";
import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/options";

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
const session = await getServerSession(nextAuthOptions);
if (!session || session.user.role !== 'admin') { 
redirect("/");
}
return (
<DefaultLayout HeaderTitle={(await params).slug}>
    <Dashboard param={(await params).slug}></Dashboard>
</DefaultLayout>
);
}