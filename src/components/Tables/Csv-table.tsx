import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../Tables/genericComponent/Data-Table";

interface CSVData {
[key: string]: string;
}

interface CSVTableProps {
csvData: string;
title: string;
}

const parseCSV = (csv: string): CSVData[] => {
const [header, ...rows] = csv.split("\n");
const headers = header.split(",");
return rows.map((row) => {
const values = row.split(",");
return headers.reduce((obj, header, index) => {
    obj[header] = values[index];
    return obj;
}, {} as CSVData);
});
};

const CSVTable: React.FC<CSVTableProps> = ({ csvData, title }) => {
const columns: ColumnDef<CSVData>[] = csvData
.split("\n")[0]
.split(",")
.map((header) => ({
    accessorFn: (row) => row[header],
    id: header,
    header: header,
}));

return (
<div className="mt-6">
    <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
    {title}
    </h2>
    <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg overflow-x-auto">
    <DataTable columns={columns} data={parseCSV(csvData)} filterColumn={columns[0]?.id || ""} />
    </div>
</div>
);
};

export default CSVTable;