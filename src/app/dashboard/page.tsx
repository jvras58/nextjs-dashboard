import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AfiliadosList from "@/components/Cards/cardAfiliado/AfiliadosList";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboards - Afiliados",
    description: "Dashboard da Betinha",
};

const Home = () => {
return (
<DefaultLayout HeaderTitle="Afiliados">
    <AfiliadosList />
</DefaultLayout>
);
};

export default Home;