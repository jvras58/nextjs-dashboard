"use client";

import * as React from "react";
import {
ColumnDef,
SortingState,
ColumnFiltersState,
VisibilityState,
flexRender,
getCoreRowModel,
getFilteredRowModel,
getPaginationRowModel,
getSortedRowModel,
useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
DropdownMenu,
DropdownMenuCheckboxItem,
DropdownMenuContent,
DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
Table,
TableBody,
TableCell,
TableHead,
TableHeader,
TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData> {
columns: ColumnDef<TData>[];
data: TData[];
}

export function DataTable<TData>({ columns, data }: DataTableProps<TData>) {
const [sorting, setSorting] = React.useState<SortingState>([]);
const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 5 });

const table = useReactTable({
data,
columns,
onSortingChange: setSorting,
onColumnFiltersChange: setColumnFilters,
getCoreRowModel: getCoreRowModel(),
getPaginationRowModel: getPaginationRowModel(),
getSortedRowModel: getSortedRowModel(),
getFilteredRowModel: getFilteredRowModel(),
onColumnVisibilityChange: setColumnVisibility,
state: {
    sorting,
    columnFilters,
    columnVisibility,
    pagination,
},
onPaginationChange: setPagination,
});

return (
<div className="w-full">
    <div className="flex items-center py-4">
    <Input
        placeholder="Filtrar..."
        value={(table.getColumn("nome_campanha")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
        table.getColumn("nome_campanha")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
    />
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto">
            Colunas <ChevronDown />
        </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
        {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
            return (
                <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                }
                >
                {column.id}
                </DropdownMenuCheckboxItem>
            );
            })}
        </DropdownMenuContent>
    </DropdownMenu>
    </div>
    <div className="rounded-md border">
    <Table>
        <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
                return (
                <TableHead key={header.id}>
                    {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                        )}
                </TableHead>
                );
            })}
            </TableRow>
        ))}
        </TableHeader>
        <TableBody>
        {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
                        <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
            >
                {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                    {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                    )}
                </TableCell>
                ))}
            </TableRow>
            ))
        ) : (
            <TableRow>
            <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
            >
                Não há Resultados.
            </TableCell>
            </TableRow>
        )}
        </TableBody>
    </Table>
    </div>
    <div className="flex items-center justify-end space-x-2 py-4">
    <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredRowModel().rows.length} Colunas(s) disponível.
    </div>
    <div className="space-x-2">
        <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        >
        Anterior
        </Button>
        <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        >
        Próximo
        </Button>
    </div>
    </div>
</div>
);
}