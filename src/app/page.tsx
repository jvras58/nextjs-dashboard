import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: "Betinha - WEB",
  description: "Dashboard da Betinha",
};

export default function Home() {
  return (
    <DefaultLayout>
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
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button className="px-6 py-3 bg-primary text-white rounded-lg shadow-lg hover:bg-primary-dark transition">
                  Explorar
                </button>
                <button className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition">
                  Saiba Mais
                </button>
              </div>
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
