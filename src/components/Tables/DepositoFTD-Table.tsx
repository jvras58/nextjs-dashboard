"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./genericComponent/Data-Table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
DropdownMenu,
DropdownMenuContent,
DropdownMenuItem,
DropdownMenuLabel,
DropdownMenuSeparator,
DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DepositoFTd {
nome_Campanha_deposito: string;
ftd: number;
ftd_amount: number;
transaction_value_quantidade: number;
transaction_value: number;
}

const data: DepositoFTd[] = [
{ nome_Campanha_deposito: "Campanha A", ftd: 120, ftd_amount: 100, transaction_value_quantidade: 100, transaction_value: 100 },
{ nome_Campanha_deposito: "Campanha B", ftd: 80, ftd_amount: 200, transaction_value_quantidade: 150, transaction_value: 200 },
{ nome_Campanha_deposito: "Campanha C", ftd: 150, ftd_amount: 300, transaction_value_quantidade: 200, transaction_value: 300 },
{ nome_Campanha_deposito: "Campanha D", ftd: 250, ftd_amount: 400, transaction_value_quantidade: 250, transaction_value: 400 },
{ nome_Campanha_deposito: "Campanha E", ftd: 300, ftd_amount: 500, transaction_value_quantidade: 300, transaction_value: 500 },
{ nome_Campanha_deposito: "Campanha F", ftd: 200, ftd_amount: 600, transaction_value_quantidade: 350, transaction_value: 600 },
{ nome_Campanha_deposito: "Campanha G", ftd: 100, ftd_amount: 700, transaction_value_quantidade: 400, transaction_value: 700 },
];

const columns: ColumnDef<DepositoFTd>[] = [
{
accessorKey: "nome_Campanha_deposito",
header: "Campanha",
cell: ({ row }) => <div className="capitalize">{row.getValue("nome_Campanha_deposito")}</div>,
},
{
accessorKey: "ftd",
header: ({ column }) => {
    return (
    <div className="text-right">
        <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
        FTD
        <ArrowUpDown className="ml-2" />
        </Button>
    </div>
    );
},
cell: ({ row }) => <div className="text-right">{row.getValue("ftd")}</div>,
},
{
accessorKey: "ftd_amount",
header: ({ column }) => {
    return (
    <div className="text-right">
        <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
        FTD Amount
        <ArrowUpDown className="ml-2" />
        </Button>
    </div>
    );
},
cell: ({ row }) => <div className="text-right">{row.getValue("ftd_amount")}</div>,
},
{
accessorKey: "transaction_value_quantidade",
header: ({ column }) => {
    return (
    <div className="text-right">
        <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
        Quantidade de transação
        <ArrowUpDown className="ml-2" />
        </Button>
    </div>
    );
},
cell: ({ row }) => <div className="text-right">{row.getValue("transaction_value_quantidade")}</div>,
},
{
accessorKey: "transaction_value",
header: ({ column }) => {
    return (
    <div className="text-right">
        <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
        Quantidade de transação em R$
        <ArrowUpDown className="ml-2" />
        </Button>
    </div>
    );
},
cell: ({ row }) => <div className="text-right">{row.getValue("transaction_value")}</div>,
},
{
id: "actions",
enableHiding: false,
cell: ({ row }) => {
    const deposito = row.original;

    return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
        </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
    {/* TODO: refazer essa parte para ele copiar toda a linha */}
        <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(deposito.nome_Campanha_deposito)}
        >
            Copie o nome da Campanha
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        </DropdownMenuContent>
    </DropdownMenu>
    );
},
},
];

const DepositoFTDTable: React.FC = () => {
return (
<div className="col-span-12 rounded-[10px] bg-white px-7.5 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-5">
    <div className="mb-4 justify-between gap-4 sm:flex">
    <div>
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
        Campanha Deposito FTD
        </h4>
    </div>
    </div>
    {/* TODO: refazer essa parte do filtro para ser igual ao datastudio é poder filtrar por qualquer coluna */}
    <DataTable columns={columns} data={data} filterColumn="nome_Campanha_deposito" />
</div>
);
};

export default DepositoFTDTable;