"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./genericComponent/DataTable";
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

interface EstadoAfiliado {
estado: string;
quantidade_de_cadastro: number;
}

const data: EstadoAfiliado[] = [
{ estado: "Estado A", quantidade_de_cadastro: 120 },
{ estado: "Estado B", quantidade_de_cadastro: 80 },
{ estado: "Estado C", quantidade_de_cadastro: 150 },
{ estado: "Estado D", quantidade_de_cadastro: 250 },
{ estado: "Estado E", quantidade_de_cadastro: 300 },
{ estado: "Estado F", quantidade_de_cadastro: 200 },
{ estado: "Estado G", quantidade_de_cadastro: 100 },
];

const columns: ColumnDef<EstadoAfiliado>[] = [
{
accessorKey: "estado",
header: "Estado",
cell: ({ row }) => <div className="capitalize">{row.getValue("estado")}</div>,
},
{
accessorKey: "quantidade_de_cadastro",
header: ({ column }) => {
    return (
    <div className="text-right">
        <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
        Qtd Cad
        <ArrowUpDown className="ml-2" />
        </Button>
    </div>
    );
},
cell: ({ row }) => <div className="text-right">{row.getValue("quantidade_de_cadastro")}</div>,
},
{
id: "actions",
enableHiding: false,
cell: ({ row }) => {
    const estado = row.original;

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
            onClick={() => navigator.clipboard.writeText(estado.estado)}
        >
            Copie o nome do Estado
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        </DropdownMenuContent>
    </DropdownMenu>
    );
},
},
];

const EstadoTable: React.FC = () => {
return (
<div className="col-span-12 rounded-[10px] bg-white px-7.5 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-5">
    <div className="mb-4 justify-between gap-4 sm:flex">
    <div>
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
        Estados
        </h4>
    </div>
    </div>
    {/* TODO: refazer essa parte do filtro para ser igual ao datastudio é poder filtrar por qualquer coluna */}
    <DataTable columns={columns} data={data} filterColumn="estado" />
</div>
);
};

export default EstadoTable;