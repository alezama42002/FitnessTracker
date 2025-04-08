import React from "react";
import Chart from "react-apexcharts";
import { useState } from "react";
import PopUpWeight from "../../PopUpWeight";

export default function WeightGraph({ weightData, weekDays }) {
  const [open, setOpen] = useState(false);

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
        <div className="relative flex justify-between items-center">
          <h1 className=" block font-sans text-base font-extrabold leading-relaxed tracking-normal text-white antialiased">
            Weight
          </h1>
          <button
            className="bg-[#1B9E4B] text-[12px] font-normal text-white px-4 py-2 rounded-[8px] cursor-pointer md:hidden"
            onClick={() => setOpen(true)}
          >
            Log Weight
          </button>
        </div>
      </div>
      {open && (
        <div className="absolute inset-0 z-50 flex items-center justify-center text-white">
          <PopUpWeight
            onClose={() => setOpen(false)}
            onSave={() => setOpen(false)}
          />
        </div>
      )}
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
