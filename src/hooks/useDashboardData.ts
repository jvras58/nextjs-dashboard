import useCadastroData from "@/hooks/useCadastroData";
import useTotalApostado from "@/hooks/useTotalApostado";
import useTotalInvestido from "@/hooks/useTotalInvestido";

export default function useDashboardData(param: string) {
    const { data: cadastroData, loading: cadastroLoading } = useCadastroData("cadastro", param);
    const { data: totalInvestido, loading: investidoLoading } = useTotalInvestido(param);
    const { data: totalApostado, loading: apostadoLoading } = useTotalApostado(param);

    return {
        cadastroData,
        totalInvestido,
        totalApostado,
        loading: cadastroLoading || investidoLoading || apostadoLoading
    };
}
