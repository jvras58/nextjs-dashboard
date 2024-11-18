import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";
import useDepositsChart from "@/hooks/useDepositsChart";
import DefaultSelectOption from "@/components/SelectOption/DefaultSelectOption";

interface ChartOneProps {
  param: any;
}

const ChartOne: React.FC<ChartOneProps> = ({ param }) => {
  const { data, loading, error } = useDepositsChart(param);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {[1].map((_, index) => (
          <div key={index} className="animate-pulse bg-gray-500 h-[310px] rounded-md"></div>
        ))}
      </div>
    );
  }
  
  if (error) return <p>Erro ao carregar: {error.message}</p>;

  const series = [
    {
      name: "Total Arrecadado",
      data: data.totalArrecadado,
    },
    {
      name: "Depósitos Realizados",
      data: data.depositosRealizados,
    },
  ];

  const options: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#5750F1", "#0ABEF9"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 310,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    fill: {
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 320,
          },
        },
      },
    ],
    stroke: {
      curve: "smooth",
    },
    markers: {
      size: 0,
    },
    grid: {
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: () => "",
        },
      },
      marker: {
        show: false,
      },
    },
    xaxis: {
      type: "category",
      categories: data.categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
    },
  };

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-7">
      <div className="mb-3.5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            Visão geral dos Depósitos
          </h4>
        </div>
        <div className="flex items-center gap-2.5">
          <p className="font-medium uppercase text-dark dark:text-dark-6">Período:</p>
          <DefaultSelectOption options={["Mensal", "Anual"]} />
        </div>
      </div>
      <div>
        <ReactApexChart options={options} series={series} type="area" height={310} />
      </div>

      <div className="flex flex-col gap-2 text-center xsm:flex-row xsm:gap-0">
        <div className="border-stroke dark:border-dark-3 xsm:w-1/2 xsm:border-r">
          <p className="font-medium">Total Arrecadado</p>
          <h4 className="mt-1 text-xl font-bold text-dark dark:text-white">
            ${data.totalArrecadado.reduce((sum, value) => sum + value, 0).toLocaleString()}
          </h4>
        </div>
        <div className="xsm:w-1/2">
          <p className="font-medium">Depósitos Realizados</p>
          <h4 className="mt-1 text-xl font-bold text-dark dark:text-white">
            {data.depositosRealizados.reduce((sum, count) => sum + count, 0)}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default ChartOne;