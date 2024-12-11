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

export default function useDashboardData(param: string, startingDate?: Date, endingDate?: Date) {

    const { data: cadastroData, isLoading: cadastroLoading } = useCadastroData("cadastro", param); // estanos usando o firestore neste mas poderia ser a planilha que seria o hook useTotalCadastro(param)
    
    const { data: totalCustoCadastro, isLoading: totalCustoCadastroLoading } = useCustoCadastro(param, startingDate, endingDate);

    const { data: ConversaoCadastroFTD, isLoading: ConversaoCadastroFTDLoading } = useConversaoCadastroFTD(param, startingDate, endingDate);

    const [ totalInvestido,  investidoLoading ] = useTotalInvestido(param, startingDate, endingDate);

    // const { data: MediaInvestida, isLoading: MediaInvestidaLoading } = useMediaInvestida(param, startingDate, endingDate);

    const { data: roi, isLoading: roiLoading } = useRoi(param, startingDate, endingDate);

    const [totalApostado, apostadoLoading ] = useTotalApostado(param, startingDate, endingDate);

    const [ totalPremios, premiosLoading ] = useTotalPremios(param, startingDate, endingDate);

    const [ totalFtd, ftdLoading ] = useQuantidadeFTD(param, startingDate, endingDate);

    const [totalAmountFtd, amountFtdLoading ] = useFtdAmount(param, startingDate, endingDate);

    const [totalDeposito, depositoLoading ] = useQuantidadeDeposito(param, startingDate, endingDate);

    const [totalAmountDeposito, depositoAmountLoading] = useDepositoValor(param, startingDate, endingDate);

    const { data: CustoFTD, isLoading: CustoFTDLoading} = useCustoFTD(param, startingDate, endingDate);
    
    const { data: ValorMedioFTD, isLoading: ValorMedioFTDLoading} = useValorMedioFTD(param, startingDate, endingDate);
    
    const { data: TaxaRedeposito, isLoading: TaxaRedepositoLoading} = useTaxaRedeposito(param, startingDate, endingDate);

    const { data: TicketMedio, isLoading:TicketMedioLoading} = useTicketMedio(param, startingDate, endingDate);

    const [ totalGgr, ggrLoading] = useGgrValor(param, startingDate, endingDate);
    
    const { data: taxaRetencao, isLoading: taxaRetencaoLoading } = useTaxaRetencaoDeposito(param, startingDate, endingDate);


    return {
        cadastroData: cadastroData ?? [],
        totalCustoCadastro,
        ConversaoCadastroFTD,
        totalInvestido,
        // MediaInvestida,
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
        loading: cadastroLoading || totalCustoCadastroLoading || ConversaoCadastroFTDLoading || investidoLoading || roiLoading || apostadoLoading || premiosLoading || ftdLoading || amountFtdLoading || depositoLoading || depositoAmountLoading || CustoFTDLoading || TaxaRedepositoLoading || TicketMedioLoading || ValorMedioFTDLoading || ggrLoading || taxaRetencaoLoading
    };
}
