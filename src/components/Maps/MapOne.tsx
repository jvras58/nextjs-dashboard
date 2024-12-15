"use client";

import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantize } from "d3-scale";
import brasil from "@/geodata/brasil.json"; // TODO: Procurar um online seria melhor


const colorScale = scaleQuantize<string>()
  .domain([1, 10])
  .range([
    "#ffedea",
    "#ffcec5",
    "#ffad9f",
    "#ff8a75",
    "#ff5533",
    "#e2492d",
    "#be3d26",
    "#9a311f",
    "#782618",
  ]);


const mockData = [
  { Estado: "AC", count: 5 },
  { Estado: "AL", count: 7 },
  { Estado: "AM", count: 6 },
  { Estado: "AP", count: 3 },
  { Estado: "BA", count: 8 },
  { Estado: "CE", count: 4 },
  { Estado: "DF", count: 9 },
  { Estado: "ES", count: 2 },
  { Estado: "GO", count: 100 },
  { Estado: "MA", count: 1 },
  { Estado: "MT", count: 7 },
  { Estado: "MS", count: 4 },
  { Estado: "MG", count: 6 },
  { Estado: "PA", count: 8 },
  { Estado: "PB", count: 5 },
  { Estado: "PR", count: 9 },
  { Estado: "PE", count: 7 },
  { Estado: "PI", count: 3 },
  { Estado: "RJ", count: 10 },
  { Estado: "RN", count: 2 },
  { Estado: "RS", count: 4 },
  { Estado: "RO", count: 6 },
  { Estado: "RR", count: 5 },
  { Estado: "SC", count: 7 },
  { Estado: "SP", count: 9 },
  { Estado: "SE", count: 2 },
  { Estado: "TO", count: 1 },
];

const MapOne: React.FC = () => {
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  return (
    <div className="col-span-12 rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-7">
      <h4 className="mb-7 text-body-2xlg font-bold text-dark dark:text-white">
        Quantidades por região
      </h4>
      <div className="h-[300px] w-full">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 900, // Ajuste o zoom do mapa
            center: [-55, -15], // Centraliza o mapa no Brasil
          }}
        >
          <Geographies geography={brasil}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const cur = mockData.find((d) => d.Estado === geo.id);
                const fillColor = cur ? colorScale(cur.count) : "#EEE";
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fillColor}
                    onMouseEnter={() => setHoveredState(geo.properties.name)}
                    onMouseLeave={() => setHoveredState(null)}
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
        {hoveredState && (
          <div className="absolute bg-black text-white rounded px-2 py-1 text-sm">
            {hoveredState}
          </div>
        )}
      </div>
    </div>
  );
};

export default MapOne;
