import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Dashboard from "@/components/Dashboard/Dashboard";
import { getServerSession } from "next-auth";
import React from "react";

export const metadata: Metadata = {
  title: 'Dashboard Afiliado',
  description: "Dashboard do Afiliado",
};

export default async function Page() {
  //TODO: COM O SESSION TEMOS EXATAMENTE OQ É PASSADA PARA A SESSÃO DO USUARIO AGORA É CRIAR UM MODEL NOVO COM A AFILIAÇÃO E PAPEL DO USUARIO
  const session = await getServerSession();
  console.log(session?.user?.name)
  return (
    <DefaultLayout HeaderTitle="DKC">
      <Dashboard param="DKC"></Dashboard>
    </DefaultLayout>
  );
}