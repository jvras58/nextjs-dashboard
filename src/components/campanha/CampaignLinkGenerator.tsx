"use client";

import { useState } from "react";
import useAffiliate from "@/hooks/useAffiliateCampanha";

const CampaignLinkGenerator: React.FC = () => {
  const [nomeCampanha, setnomeCampanha] = useState<string>("");
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const affiliate = useAffiliate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!affiliate) {
        throw new Error("Affiliate não encontrado");
      }

      // Mock da geração do link
      const link = `https://betinha.com/cadastro?afiliado=${affiliate}&campanha=${encodeURIComponent(nomeCampanha)}`;
      setGeneratedLink(link);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erro ao gerar link de campanha");
      console.error("Erro ao gerar link:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 items-center">
        <input
          type="text"
          value={nomeCampanha}
          onChange={(e) => setnomeCampanha(e.target.value)}
          placeholder="Digite o nome da campanha"
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
          {loading ? 'Carregando...' : 'Gerar Link'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {generatedLink && (
        <div className="mt-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Link Gerado</h2>
            <p className="text-sm text-gray-600">{generatedLink}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignLinkGenerator;