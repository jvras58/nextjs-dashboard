import useCadastroData from "@/hooks/useCadastroData";
import useTotalApostado from "@/hooks/useTotalApostado";
import useTotalInvestido from "@/hooks/useTotalInvestido";
import useTotalPremios from "@/hooks/useTotalPremios";
import useQuantidadeFTD from "@/hooks/useFtdQntd";
import useFtdAmount from "@/hooks/useFtdAmount";
import useQuantidadeDeposito from "@/hooks/useDepositoQntd";
import useDepositoValor from "@/hooks/useDepositoValorQntd";
import useGgrValor from "@/hooks/useGgrValor";
import useMediaInvestida from "@/hooks/useMediaInvestida";
import useRoi from "@/hooks/useRoi";
import useTaxaRetencaoDeposito from "@/hooks/useTaxaRetencaoDeposito";
import useCustoCadastro from "@/hooks/useCustoCadastro";
import useConversaoCadastroFTD from "@/hooks/useConversaoCadastroFtd";
import useCustoFTD from "@/hooks/useCustoFTD";
import useValorMedioFTD from "@/hooks/useTicketMedioFTD";
import useTaxaRedeposito from "@/hooks/useRedeposito";
import useTicketMedio from "@/hooks/useTicktetMedio";

export default function useDashboardData(param: string) {

    const { data: cadastroData, isLoading: cadastroLoading } = useCadastroData("cadastro", param); // estanos usando o firestore neste mas poderia ser a planilha que seria o hook useTotalCadastro(param)
    
    const { data: totalCustoCadastro, isLoading: totalCustoCadastroLoading } = useCustoCadastro(param);

    const { data: ConversaoCadastroFTD, isLoading: ConversaoCadastroFTDLoading } = useConversaoCadastroFTD(param);

    const { data: totalInvestido, isLoading: investidoLoading } = useTotalInvestido(param);

    const { data: MediaInvestida, isLoading: MediaInvestidaLoading } = useMediaInvestida(param);

    const { data: roi, isLoading: roiLoading } = useRoi(param); 

    const { data: totalApostado, isLoading: apostadoLoading } = useTotalApostado(param);

    const { data: totalPremios, isLoading: premiosLoading } = useTotalPremios(param);

    const { data: totalFtd, isLoading: ftdLoading } = useQuantidadeFTD(param);

    const { data: totalAmountFtd, isLoading: amountFtdLoading } = useFtdAmount(param);

    const { data: totalDeposito, isLoading: depositoLoading } = useQuantidadeDeposito(param);

    const { data: totalAmountDeposito, isLoading: depositoAmountLoading} = useDepositoValor(param);

    const { data: CustoFTD, isLoading: CustoFTDLoading} = useCustoFTD(param);
    
    const { data: ValorMedioFTD, isLoading: ValorMedioFTDLoading} = useValorMedioFTD(param);
    
    const { data: TaxaRedeposito, isLoading: TaxaRedepositoLoading} = useTaxaRedeposito(param);

    const { data: TicketMedio, isLoading:TicketMedioLoading} = useTicketMedio(param);

    const { data: totalGgr, isLoading: ggrLoading} = useGgrValor(param);
    
    const { data: taxaRetencao, isLoading: taxaRetencaoLoading } = useTaxaRetencaoDeposito(param);


    return {
        cadastroData: cadastroData ?? [],
        totalCustoCadastro,
        ConversaoCadastroFTD,
        totalInvestido,
        MediaInvestida,
        roi,
        totalApostado,
        totalPremios,
        totalFtd,
        totalAmountFtd,
        totalDeposito,
        totalAmountDeposito,
        CustoFTD,
        TaxaRedeposito,
        ValorMedioFTD,
        TicketMedio,
        totalGgr,
        taxaRetencao,
        loading: cadastroLoading || totalCustoCadastroLoading || ConversaoCadastroFTDLoading || investidoLoading || MediaInvestidaLoading || roiLoading || apostadoLoading || premiosLoading || ftdLoading || amountFtdLoading || depositoLoading || depositoAmountLoading || CustoFTDLoading || TaxaRedepositoLoading || TicketMedioLoading || ValorMedioFTDLoading || ggrLoading || taxaRetencaoLoading
    };
}
