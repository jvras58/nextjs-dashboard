import React from "react";

interface Props {
  title: string;
  children?: React.ReactNode;
}

export default function CardsSection({ title, children }: Props) {
  return (
    <section className="bg-el bg-elevation my-4 flex w-screen flex-col items-center rounded p-4 shadow md:w-3/4">
      <h2 className="mb-2 text-2xl font-semibold">{title}</h2>
      <div className="flex w-full flex-col items-center md:flex-row md:flex-wrap md:justify-evenly">
        {children}
      </div>
    </section>
  );
}
