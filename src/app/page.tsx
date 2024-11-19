import { Metadata } from "next";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Betinha - Dashboard Afiliados",
  description: "Dashboard de afiliados da Betinha",
};

export default function Home() {
  return (
    <DefaultLayout>
      <h1>Bem-vindo ao deashboard Betinha!</h1>
    </DefaultLayout>
  );
}
