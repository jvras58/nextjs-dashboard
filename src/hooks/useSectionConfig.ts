import CardTotalInvestido from "@/components/Cards/CardsInvestimento/card-TotalInvestimento";
import CardMediaDiaInvestimento from "@/components/Cards/CardsInvestimento/card-MediaInvestimento";
import CardRoi from "@/components/Cards/CardsInvestimento/card-Roi";
import MapOne from "@/components/Maps/MapOne";
import CampaignTable from "@/components/Tables/Campanha-Table";
import EstadoTable from "@/components/Tables/Estado-Table";
import DepositoFTDTable from "@/components/Tables/DepositoFTD-Table";
import TotalApostado from "@/components/Cards/CardGGr/card-TotalApostado";
import CardTotalPremios from "@/components/Cards/CardGGr/card-TotalPremios";
import CardGGR from "@/components/Cards/CardGGr/card-Ggr";
import CardRetencaoDeposito from "@/components/Cards/CardGGr/card-RetencaoDeposito";
import CardCadastro from "@/components/Cards/Cadastro/card-cadastro";
import CardCustoCadastro from "@/components/Cards/Cadastro/card-custocadastro";
import CardConversaocadastroftd from "@/components/Cards/Cadastro/card-conversaocadastroFtd";
import CardFtdqntd from "@/components/Cards/Deposito/card-Ftdqntd";
import CardFtdamount from "@/components/Cards/Deposito/card-AmountFtd";
import CardCustoFTD from "@/components/Cards/Deposito/card-custoFtd";
import CardTicketMedioFTD from "@/components/Cards/Deposito/card-TicktetmedioFtd";
import CardQntdDeposito from "@/components/Cards/Deposito/card-depositoqntd";
import CardDepositoValor from "@/components/Cards/Deposito/card-depositosValue";
import CardReDeposito from "@/components/Cards/Deposito/card-TaxaReDeposito";
import CardTicketMedioGeral from "@/components/Cards/Deposito/card-TicktetmedioGeral";
import useDashboardData from "@/hooks/useDashboardData";
import { useMemo } from "react";

export const useSectionConfig = (param: string | undefined) => {
  const {
    cadastroData,
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
    ValorMedioFTD,
    TaxaRedeposito,
    TicketMedio,
    totalGgr,
    taxaRetencao,
  } = useDashboardData(param || "");
  return useMemo(
    () => [
      {
        title: "Investimento",
        cards: [
          {
            component: CardTotalInvestido,
            props: { totalInvestido: totalInvestido ?? 0 },
          },
          {
            component: CardMediaDiaInvestimento,
            props: { MediaInvestida: MediaInvestida ?? 0 },
          },
          { component: CardRoi, props: { roi: roi ?? 0 } },
        ],
        tables: [],
      },
      {
        title: "GGR",
        cards: [
          {
            component: TotalApostado,
            props: { totalApostado: totalApostado ?? 0 },
          },
          {
            component: CardTotalPremios,
            props: { totalPremios: totalPremios ?? 0 },
          },
          { component: CardGGR, props: { totalGgr: totalGgr ?? 0 } },
          {
            component: CardRetencaoDeposito,
            props: { taxaRetencao: taxaRetencao ?? "0%" },
          },
        ],
        tables: [],
      },
      {
        title: "Cadastro",
        cards: [
          {
            component: CardCadastro,
            props: { userCount: cadastroData.length },
          },
          {
            component: CardCustoCadastro,
            props: { totalCustoCadastro: totalCustoCadastro ?? 0 },
          },
          {
            component: CardConversaocadastroftd,
            props: { ConversaoCadastroFTD: ConversaoCadastroFTD ?? "0%" },
          },
        ],
        tables: [
          {
            component: CampaignTable,
            props: { param },
            layout: "col-span-12 xl:col-span-7", // Tabela maior na esquerda
          },
          {
            component: EstadoTable,
            props: { param },
            layout: "col-span-12 xl:col-span-5", // Tabela menor na direita
          },
          {
            component: MapOne,
            props: {},
            layout:
              "col-span-12 flex justify-center items-center min-h-[400px]", // Mapa ocupa toda a largura
          },
        ],
      },
      {
        title: "Depósito",
        cards: [
          { component: CardFtdqntd, props: { totalFtd: totalFtd ?? 0 } },
          {
            component: CardFtdamount,
            props: { totalAmountFtd: totalAmountFtd ?? 0 },
          },
          { component: CardCustoFTD, props: { CustoFTD: CustoFTD ?? 0 } },
          {
            component: CardTicketMedioFTD,
            props: { ValorMedioFTD: ValorMedioFTD ?? 0 },
          },
        ],
        tables: [],
      },
      {
        title: "",
        cards: [
          {
            component: CardQntdDeposito,
            props: { totalDeposito: totalDeposito ?? 0 },
          },
          {
            component: CardDepositoValor,
            props: { totalAmountDeposito: totalAmountDeposito ?? 0 },
          },
          {
            component: CardReDeposito,
            props: { TaxaRedeposito: TaxaRedeposito ?? "0%" },
          },
          {
            component: CardTicketMedioGeral,
            props: { TicketMedio: TicketMedio ?? 0 },
          },
        ],
        tables: [
          {
            component: DepositoFTDTable,
            props: { param },
            layout: "col-span-12", // Tabela no final
          },
        ],
      },
    ],
    [
      totalInvestido,
      MediaInvestida,
      roi,
      totalApostado,
      totalPremios,
      totalGgr,
      taxaRetencao,
      cadastroData.length,
      totalCustoCadastro,
      ConversaoCadastroFTD,
      param,
      totalFtd,
      totalAmountFtd,
      CustoFTD,
      ValorMedioFTD,
      totalDeposito,
      totalAmountDeposito,
      TaxaRedeposito,
      TicketMedio,
    ],
  );
};
