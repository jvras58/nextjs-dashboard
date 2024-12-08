"use client";

import { useState } from "react";
import CSVTable from "../Tables/Csv-table";

interface SheetData {
  title: string;
  sheetTitle: string;
  headers: string[];
  rows: Record<string, any>[];
  totalRows: number;
}

const InputBox: React.FC = () => {
  const [id, setId] = useState<string>("");
  const [result, setResult] = useState<SheetData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const convertToCSV = (data: SheetData): string => {
    const headers = data.headers.join(",");
    const rows = data.rows.map(row => 
      data.headers.map(header => row[header]).join(",")
    );
    return [headers, ...rows].join("\n");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`/api/sheets?spreadsheetId=${id}`);

      if (!response.ok) {
        throw new Error("Falha ao buscar dados da planilha");
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erro ao buscar dados da planilha");
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
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
          disabled={loading}
          className={`w-full p-3 bg-primary text-white font-semibold rounded-lg transition duration-300 ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
          }`}
        >
          {loading ? 'Carregando...' : 'Enviar'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold">{result.title}</h2>
            <p className="text-sm text-gray-600">Aba: {result.sheetTitle}</p>
            <p className="text-sm text-gray-600">Total de linhas: {result.totalRows}</p>
          </div>
          <CSVTable 
            csvData={convertToCSV(result)} 
            title={result.title} 
          />
        </div>
      )}
    </div>
  );
};

export default InputBox;