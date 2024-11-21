"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./DataTable";
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
import { Checkbox } from "@/components/ui/checkbox";

interface Campaign {
nome_campanha: string;
quantidade_de_cadastro: number;
}

const data: Campaign[] = [
{ nome_campanha: "Campanha A", quantidade_de_cadastro: 120 },
{ nome_campanha: "Campanha B", quantidade_de_cadastro: 80 },
{ nome_campanha: "Campanha C", quantidade_de_cadastro: 150 },
{ nome_campanha: "Campanha D", quantidade_de_cadastro: 250 },
];

const columns: ColumnDef<Campaign>[] = [
{
id: "select",
header: ({ table }) => (
    <Checkbox
    checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
    }
    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    aria-label="Select all"
    />
),
cell: ({ row }) => (
    <Checkbox
    checked={row.getIsSelected()}
    onCheckedChange={(value) => row.toggleSelected(!!value)}
    aria-label="Select row"
    />
),
enableSorting: false,
enableHiding: false,
},
{
accessorKey: "nome_campanha",
header: "Campanha",
cell: ({ row }) => <div className="capitalize">{row.getValue("nome_campanha")}</div>,
},
{
accessorKey: "quantidade_de_cadastro",
header: ({ column }) => {
    return (
    <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
        Qtd Cad
        <ArrowUpDown />
    </Button>
    );
},
cell: ({ row }) => <div className="text-right">{row.getValue("quantidade_de_cadastro")}</div>,
},
{
id: "actions",
enableHiding: false,
cell: ({ row }) => {
    const campaign = row.original;

    return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
        </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(campaign.nome_campanha)}
        >
            Copy campaign name
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View details</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    );
},
},
];

const CampaignTable: React.FC = () => {
return <DataTable columns={columns} data={data} />;
};

export default CampaignTable;