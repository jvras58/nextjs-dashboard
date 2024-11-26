"use client";

import useFiliadoList from "@/hooks/useFiliadoList";
import AfiliadoCard from "@/components/Cards/Afiliado/afiliado";

const AfiliadosList = () => {
const { data } = useFiliadoList("cadastro");

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

export default AfiliadosList;