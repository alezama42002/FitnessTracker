import React from "react";
import Chart from "react-apexcharts";

export default function WeightGraph({ weightData, weekDays }) {
  const chartConfig = {
    series: [
      {
        name: "Weight",
        data: weightData,
      },
    ],
    chart: {
      type: "line",
      height: "100%",
      toolbar: { show: false },
    },
    title: { show: false },
    dataLabels: { enabled: false },
    colors: ["#1B9E4B"],
    stroke: {
      lineCap: "round",
      curve: "smooth",
    },
    markers: { size: 0 },
    xaxis: {
      categories: weekDays,
      axisTicks: { show: false },
      axisBorder: { show: false },
      labels: {
        style: {
          colors: "#FFFFFF",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
      tickAmount: 6,
      crosshairs: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#FFFFFF",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#19212C",
      strokeDashArray: 5,
      xaxis: { lines: { show: true } },
      padding: { top: 5, right: 20 },
    },
    fill: { opacity: 0.8 },
    tooltip: {
      enabled: true,
      theme: "dark",
      y: {
        formatter: function (value) {
          return `${value} kg`;
        },
      },
    },
  };
  return (
    <div className="relative flex flex-col rounded-xl bg-[#19212C] bg-clip-border text-gray-700 shadow-md h-full">
      <div className="relative mx-4 mt-4 flex flex-col gap-4 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none md:flex-row md:items-center">
        <div>
          <h1 className=" block font-sans text-base font-extrabold leading-relaxed tracking-normal text-white antialiased">
            Weight
          </h1>
        </div>
      </div>
      <div className=" w-full p-2 flex-grow">
        <Chart
          options={chartConfig}
          series={chartConfig.series}
          type="line"
          height="100%"
        />
      </div>
    </div>
  );
}
