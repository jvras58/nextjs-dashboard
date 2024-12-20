import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Image from "next/image";
import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import LogoutButton from "@/components/button-auth/LogoutButton";

export const metadata: Metadata = {
  title: "Betinha - WEB",
  description: "Dashboard da Betinha",
};

export default async function Home() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <DefaultLayout>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <Separator orientation="vertical" className="h-6" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Home</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <section className="h-full from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto h-full">
          <div className="flex flex-col xl:flex-row items-center justify-between xl:py-16">
            {/* Texto principal */}
            <div className="text-center xl:text-left order-2 xl:order-none">
              <h1 className="text-4xl font-bold mb-6 text-primary">
                Painel de Análise Betinha!
              </h1>
              <p className="text-lg max-w-[500px] mb-8 text-muted-foreground">
                Lorem ipsum dolor sit amet. Et molestiae amet et voluptatem culpa aut nihil labore
                aut excepturi velit sed quaerat consectetur ut iste molestiae non doloribus voluptatem
              </p>
              <p className="text-zinc-900 dark:text-white text-xl">
                Bem vindo, {session.user?.name}
              </p>
              <LogoutButton />
            </div>
            

            {/* Imagem de destaque */}
            <div className="order-1 xl:order-none mb-8 xl:mb-0">
              <Image
                src={"/images/icon/betinha.svg"}
                alt="Betinha"
                width={500}
                height={500}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
