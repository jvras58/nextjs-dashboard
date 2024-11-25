"use client";

import useFetchData from "@/hooks/useFetchData";
import AfiliadoCard from "@/components/Cards/cardAfiliado/afiliado";

const home = () => {
const { data, loading, error } = useFetchData("cadastro");

if (loading) {
return <div>Carregando...</div>;
}

if (error) {
return <div>Erro ao carregar dados: {error.message}</div>;
}

if (data.length === 0) {
return <div>Nenhum afiliado encontrado no banco de dados.</div>;
}

return (
<div className="grid gap-4 grid-cols-1 md:grid-cols-3 p-6">
    {data.map(({ id, affiliate }) => (
    <AfiliadoCard
        key={id}
        name={`${affiliate} Dashboard`}
        dbParam={affiliate}
    />
    ))}
</div>
);
};

export default home;