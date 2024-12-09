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
import useDepositoData from "@/hooks/useDepositoData";

interface DepositoFTd {
nome_Campanha_deposito: string;
ftd: number;
ftd_amount: number;
transaction_value_quantidade: number;
transaction_value: number;
}

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
cell: ({ row }) => (
    <div className="text-right">
      {new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(row.getValue("ftd_amount"))}
    </div>
),
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
cell: ({ row }) => (
    <div className="text-right">
      {new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(row.getValue("transaction_value"))}
    </div>
  ),
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
interface DepositoFTDTableProps {
 param?: string;
}
  
const DepositoFTDTable: React.FC<DepositoFTDTableProps> = ({ param }) => {
    const { data = [], isLoading, error } = useDepositoData(param || "");
  
    if (isLoading) return <div>Carregando...</div>;
    if (error) return <div>Erro ao carregar dados</div>;
    
return (
<div className="col-span-12 rounded-[10px] bg-white px-7.5 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-5 h-150">
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