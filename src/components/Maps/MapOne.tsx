"use client";

import React, { useState, useMemo, useRef } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantize } from "d3-scale";
import brasil from "@/geodata/brasil.json";
import useCadastroPorEstado from "@/hooks/usePhoneEstadoCount";
import { getStateAbbreviation } from "@/utils/EstadoHelpers"; 

interface EstadoMapOneProps {
  param?: string;
}

const MapOne: React.FC<EstadoMapOneProps> = ({ param }) => {
  const [hoveredState, setHoveredState] = useState<{ name: string; count: number } | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const { cadastrosPorEstado, isLoading, isError } = useCadastroPorEstado(param || "");

  const { mapData, colorScale } = useMemo(() => {
    const processedData = Object.entries(cadastrosPorEstado).map(([estado, registros]) => ({
      Estado: getStateAbbreviation(estado) || "Desconhecido",
      count: registros.length,
    }));

    const counts = processedData.map((d) => d.count);
    const minCount = Math.min(...counts, 1); 
    const maxCount = Math.max(...counts, 10);

    const scale = scaleQuantize<string>()
      .domain([minCount, maxCount])
      .range(["#e0f3db", "#ccebc5", "#a8ddb5", "#7bccc4", "#43a2ca", "#0868ac"]);

    return { mapData: processedData, colorScale: scale };
  }, [cadastrosPorEstado]);

  if (isLoading) {
    return <div>Carregando dados...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar dados!</div>;
  }

  return (
    <div ref={mapContainerRef} className="relative col-span-12 rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-7">
      <h4 className="mb-7 text-body-2xlg font-bold text-dark dark:text-white">
        Quantidades por região
      </h4>
      <div className="relative">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 500,
            center: [-55, -15],
          }}
        >
          <Geographies geography={brasil}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const cur = mapData.find((d) => {
                  const stateName = geo.properties.name;
                  const stateAbbreviation = getStateAbbreviation(stateName);
                  if (stateAbbreviation) {
                    return d.Estado === stateAbbreviation;
                  }
                  return false;
                });
                const fillColor = cur ? colorScale(cur.count) : "#EEE";
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fillColor}
                    onMouseEnter={(event) => {
                      const mapContainer = mapContainerRef.current;
                      if (mapContainer) {
                        const rect = mapContainer.getBoundingClientRect();
                        setTooltipPosition({
                          x: event.clientX - rect.left,
                          y: event.clientY - rect.top,
                        });
                      }
                      setHoveredState({ name: geo.properties.name, count: cur ? cur.count : 0 });
                    }}
                    onMouseMove={(event) => {
                      const mapContainer = mapContainerRef.current;
                      if (mapContainer) {
                        const rect = mapContainer.getBoundingClientRect();
                        setTooltipPosition({
                          x: event.clientX - rect.left,
                          y: event.clientY - rect.top,
                        });
                      }
                    }}
                    onMouseLeave={() => {
                      setHoveredState(null);
                      setTooltipPosition(null);
                    }}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
        {hoveredState && tooltipPosition && (
          <div
            className="absolute bg-black text-white rounded px-2 py-1 text-sm"
            style={{
              top: tooltipPosition.y,
              left: tooltipPosition.x,
              transform: "translate(-50%, -100%)",
              pointerEvents: "none",
            }}
          >
            {hoveredState.name}: {hoveredState.count}
          </div>
        )}
      </div>
    </div>
  );
};

export default MapOne;
