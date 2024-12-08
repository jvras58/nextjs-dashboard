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

    const { data: cadastroData, isLoading: cadastroLoading } = useCadastroData("cadastro", param);
    
    const { data: totalInvestido, isLoading: investidoLoading } = useTotalInvestido(param);

    const { data: totalApostado, isLoading: apostadoLoading } = useTotalApostado(param);

    const { data: totalPremios, isLoading: premiosLoading } = useTotalPremios(param);

    const { data: totalFtd, isLoading: ftdLoading } = useQuantidadeFTD(param);

    const { data: totalAmountFtd, isLoading: amountFtdLoading } = useFtdAmount(param);

    const { data: totalDeposito, isLoading: depositoLoading } = useQuantidadeDeposito(param);

    const { data: totalAmountDeposito, isLoading: depositoAmountLoading} = useDepositoValor(param);

    // FIXME: O unico com problema.... as vezes não carrega de cara mas é mexer no codigo ele aparece....
    const { data: totalGgr, isLoading: ggrLoading} = useGgrValor(param);


    return {
        cadastroData: cadastroData ?? [],
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
