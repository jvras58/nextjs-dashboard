import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Dashboard from "@/components/Dashboard/Dashboard";
import { nextAuthOptions } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: 'Dashboard Afiliado',
  description: "Dashboard do Afiliado",
};

export default async function Page() {
  const session = await getServerSession(nextAuthOptions);
    if (!session) {
      redirect("/login");
    }
  const affiliate = session?.user?.afilliate || '';

  return (
    <DefaultLayout HeaderTitle={affiliate}>
      <Dashboard param={affiliate}></Dashboard>
    </DefaultLayout>
  );
}