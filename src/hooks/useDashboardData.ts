import useCadastroData from "@/hooks/useCadastroData";
import useTotalApostado from "@/hooks/useTotalApostado";
import useTotalInvestido from "@/hooks/useTotalInvestido";
import useTotalPremios from "@/hooks/useTotalPremios";
import useQuantidadeFTD from "@/hooks/useFtdQntd";
import useFtdAmount from "@/hooks/useFtdAmount";
import useQuantidadeDeposito from "@/hooks/useDepositoQntd";
import useDepositoValor from "@/hooks/useDepositoValorQntd";
import useGgrValor from "@/hooks/useGgrValor";

export default function useDashboardData(param: string) {
    const { data: cadastroData, loading: cadastroLoading } = useCadastroData("cadastro", param);
    const { data: totalInvestido, loading: investidoLoading } = useTotalInvestido(param);
    const { data: totalApostado, loading: apostadoLoading } = useTotalApostado(param);
    const { data: totalPremios, loading: premiosLoading } = useTotalPremios(param);
    const {data: totalFtd, loading: ftdLoading} = useQuantidadeFTD(param);
    const {data: totalAmountFtd, loading: amountFtdLoading} = useFtdAmount(param);
    const {data: totalDeposito, loading: depositoLoading} = useQuantidadeDeposito(param);
    const {data: totalAmountDeposito, loading: depositoAmountLoading} = useDepositoValor(param);
    const {data: totalGgr, loading: ggrLoading} = useGgrValor(param);  

    return {
        cadastroData,
        totalInvestido,
        totalApostado,
        totalPremios,
        totalFtd,
        totalAmountFtd,
        totalDeposito,
        totalAmountDeposito,
        totalGgr,
        loading: cadastroLoading || investidoLoading || apostadoLoading || premiosLoading || ftdLoading || amountFtdLoading || depositoLoading || depositoAmountLoading || ggrLoading
    };
}
