import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import CadastroForm from '@/components/Form/cadastroForm';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { Metadata } from "next";
import { nextAuthOptions } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Cadastro de Usuário", 
  description: "Cadastro de Usuário",
};


export default async function Cadastro() {
const session = await getServerSession(nextAuthOptions);
if (!session || session.user.role !== 'admin') { 
redirect("/");
}
  return (
    <DefaultLayout HeaderTitle="Cadastro">  
    <Card className="bg-white dark:bg-gray-800">
    <CardHeader className="text-center">
        <h1 className="text-2xl font-bold text-green-800 dark:text-green-400">Cadastro</h1>
    </CardHeader>
      <CardContent>
        <CadastroForm />
      </CardContent>
    </Card>
    </DefaultLayout>
  );
}
