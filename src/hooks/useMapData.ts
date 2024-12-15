import { useMemo } from "react";
import { scaleQuantize } from "d3-scale";
import { getStateAbbreviation } from "@/utils/EstadoHelpers";

interface CadastroPorEstado {
  [key: string]: any[];
}

export const useMapData = (cadastrosPorEstado: CadastroPorEstado) => {
  return useMemo(() => {
    const processedData = Object.entries(cadastrosPorEstado).map(([estado, registros]) => ({
      Estado: getStateAbbreviation(estado) || "Desconhecido",
      count: registros.length,
    }));

    const counts = processedData.map((d) => d.count);
    const minCount = Math.min(...counts, 1);
    const maxCount = Math.max(...counts, 100);

    const scale = scaleQuantize<string>()
      .domain([minCount, maxCount])
      .range(["#e0f3db", "#ccebc5", "#a8ddb5", "#7bccc4", "#43a2ca", "#0868ac", "#00441b"]);

    return { mapData: processedData, colorScale: scale };
  }, [cadastrosPorEstado]);
};