import useCadastroData from "@/hooks/useCadastroData";
import useTotalApostado from "@/hooks/useTotalApostado";
import useTotalInvestido from "@/hooks/useTotalInvestido";
import useTotalPremios from "@/hooks/useTotalPremios";
import useQuantidadeFTD from "@/hooks/useFtdQntd";
import useFtdAmount from "@/hooks/useFtdAmount";

export default function useDashboardData(param: string) {
    const { data: cadastroData, loading: cadastroLoading } = useCadastroData("cadastro", param);
    const { data: totalInvestido, loading: investidoLoading } = useTotalInvestido(param);
    const { data: totalApostado, loading: apostadoLoading } = useTotalApostado(param);
    const { data: totalPremios, loading: premiosLoading } = useTotalPremios(param);
    const {data: totalFtd, loading: ftdLoading} = useQuantidadeFTD(param);
    const {data: totalAmountFtd, loading: amountFtdLoading} = useFtdAmount(param);

    return {
        cadastroData,
        totalInvestido,
        totalApostado,
        totalPremios,
        totalFtd,
        totalAmountFtd,
        loading: cadastroLoading || investidoLoading || apostadoLoading || premiosLoading || ftdLoading || amountFtdLoading 
    };
}
