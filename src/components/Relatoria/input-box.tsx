"use client";

import getDocs from "@/actions/spreadsheets-actions/getDocs";
import { useState } from "react";
import CSVTable from "../Tables/Csv-table";

const InputBox: React.FC = () => {
const [id, setId] = useState<string>("1NMZv6FsBUdzJLoEozSyOtscnGVnkGkBPng9xrtsRwLc");
const [result, setResult] = useState<{ title: string; csv: string } | null>(null);

const handleSubmit = async (event: React.FormEvent) => {
event.preventDefault();
try {
    const data = await getDocs(id);
    setResult(data);
} catch (error) {
    console.error("Erro ao buscar dados:", error);
}
};

return (
<div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 items-center">
    <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Digite o ID da Planilha"
        required
        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
    />
    <button
        type="submit"
        className="w-full p-3 bg-primary text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
    >
        Enviar
    </button>
    </form>
    {result && <CSVTable csvData={result.csv} title={result.title} />}
</div>
);
};

export default InputBox;