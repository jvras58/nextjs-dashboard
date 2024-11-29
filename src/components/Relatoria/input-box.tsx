"use client";

import getDocs from "@/actions/spreadsheets-actions/getDocs";
import { useState } from "react";

const InputBox: React.FC = () => {
const [id, setId] = useState<string>("");
const [result, setResult] = useState<{ title: string; csv: string } | null>(
null
);

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
    <form
    onSubmit={handleSubmit}
    className="flex flex-col space-y-4 items-center"
    >
    <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Digite o ID da Planilha"
        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
    />
    <button
        type="submit"
        className="w-full p-3 bg-primary text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
    >
        Enviar
    </button>
    </form>
    {result && (
    <div className="mt-6">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
        {result.title}
        </h2>
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg overflow-x-auto">
        <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-100">
            {result.csv}
        </pre>
        </div>
    </div>
    )}
</div>
);
};

export default InputBox;
