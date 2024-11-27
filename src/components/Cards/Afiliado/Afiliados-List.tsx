"use client";

import useFiliadoList from "@/hooks/useFiliadoList";
import AfiliadoCard from "@/components/Cards/Afiliado/afiliado";
import Loader from "@/components/common/Loader";

const AfiliadosList = () => {
const { data, loading } = useFiliadoList("cadastro");

if (loading) {
return <Loader />;
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

export default AfiliadosList;