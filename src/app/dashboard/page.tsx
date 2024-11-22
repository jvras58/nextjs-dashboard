"use client";

import useFetchData from "@/hooks/useFetchData";
import AfiliadoCard from "@/components/Cards/cardAfiliado/afiliado";

const Bet = () => {
const { data, loading } = useFetchData("cadastro");

if (loading) {
return <div>Carregando...</div>;
}
console.log(data);

const afiliadosMap = new Map();

data.filter(item => item.affiliate).forEach(item => {
if (!afiliadosMap.has(item.affiliate)) {
    afiliadosMap.set(item.affiliate, []);
}
afiliadosMap.get(item.affiliate).push(item);
});

const afiliados = Array.from(afiliadosMap.values()).map(afiliados => {
const sortedAfiliados = afiliados.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
const [mostRecent] = sortedAfiliados;
return { mostRecent };
});

if (afiliados.length === 0) {
return <div>Nenhum afiliado encontrado no banco de dados.</div>;
}

return (
<div className="grid gap-4 grid-cols-1 md:grid-cols-3 p-6">
    {afiliados.map(({ mostRecent }) => (
    <AfiliadoCard
        key={mostRecent.id}
        name={`${mostRecent.affiliate} Dashboard`}
        dbParam={mostRecent.affiliate}
    />
    ))}
</div>
);
};

export default Bet;