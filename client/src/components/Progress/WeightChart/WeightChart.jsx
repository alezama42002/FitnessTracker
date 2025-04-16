import React from "react";
import Chart from "react-apexcharts";
import { useState, useMemo } from "react";
import PopUpWeight from "../../PopUpWeight";

export default function WeightGraph({ weekWeightData }) {
  const [open, setOpen] = useState(false);

  const { weights, labels } = useMemo(() => {
    const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const today = new Date();
    const currentDay = today.getDay(); // 0 (Sun) to 6 (Sat)
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);

    const weights = dayLabels.map((_, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);

      // ✅ Zero-padded MM/DD/YY format
      const formatted = `${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}/${String(date.getDate()).padStart(2, "0")}/${String(
        date.getFullYear()
      ).slice(-2)}`;

      const match = weekWeightData.find((entry) => entry.logDate === formatted);
      return match ? match.Weight : null;
    });

    return { weights, labels: dayLabels };
  }, [weekWeightData]);

  const chartConfig = {
    series: [
      {
        name: "Weight",
        data: weights,
      },
    ],
    chart: {
      type: "line",
      height: "100%",
      width: "100%", // Ensure the chart container is full width
      toolbar: { show: false },
      zoom: { enabled: false },
      spacing: {
        left: 20,
        right: 20,
      },
    },
    title: { show: false },
    dataLabels: { enabled: false },
    colors: ["#1B9E4B"],
    stroke: {
      lineCap: "round",
      curve: "smooth",
    },
    markers: {
      size: 6,
      hover: {
        size: 6,
      },
      discrete: weights
        .map((weight, index) =>
          weight === null
            ? {
                seriesIndex: 0,
                dataPointIndex: index,
                fillColor: "transparent",
                strokeColor: "transparent",
                size: 0,
              }
            : null
        )
        .filter(Boolean),
    },

    xaxis: {
      categories: labels,
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
        show: false, // Disable crosshairs (the marker line)
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
      crosshairs: {
        show: false, // Disable crosshairs (the marker line)
      },
    },
    grid: {
      show: true,
      borderColor: "#19212C",
      strokeDashArray: 5,
      xaxis: { lines: { show: true } },
      padding: {
        top: 5,
        right: 20,
        bottom: 0,
        left: 20,
      },
    },
    fill: { opacity: 0.8 },
    tooltip: {
      enabled: true,
      theme: "dark",
      y: {
        formatter: function (value) {
          return value !== null ? `${value} kg` : ""; // Don't show tooltip for null
        },
      },
    },
  };

  return (
    <div className="relative flex flex-col rounded-xl bg-[#19212C] bg-clip-border text-gray-700 shadow-md h-full">
      <div className="relative mx-4 mt-4 flex justify-between gap-4 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none md:flex-row md:items-center">
        <h1 className=" block font-sans text-base font-extrabold leading-relaxed tracking-normal text-white antialiased">
          Weight
        </h1>
        <button
          className="PopupWeight-btn bg-[#1B9E4B] text-[12px] font-normal text-white px-4 py-2 rounded-[8px] cursor-pointer lg:hidden"
          onClick={() => setOpen(true)}
        >
          Log Weight
        </button>
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
