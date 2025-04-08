import React from "react";
import Chart from "react-apexcharts";
import { useState, useMemo } from "react";
import PopUpWeight from "../../PopUpWeight";

export default function WeightGraph({ weekWeightData }) {
  const [open, setOpen] = useState(false);

  const { weights, labels } = useMemo(() => {
    const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    // Prepare an array to store the weights for each day of the week (Mon-Sun)
    const weights = dayLabels.map((day, index) => {
      // Calculate the correct date for the given day of the week (Mon-Sun)
      const currentDate = new Date();
      const firstDayOfWeek = currentDate.getDate() - currentDate.getDay() + 1; // Ensure the start of the week is Monday
      const dayOfWeekDate = new Date(
        currentDate.setDate(firstDayOfWeek + index)
      );

      // Format the date to "MM/DD/YY" (or the format your `logDate` is in)
      const formattedDate = `${
        dayOfWeekDate.getMonth() + 1
      }/${dayOfWeekDate.getDate()}/${String(dayOfWeekDate.getFullYear()).slice(
        -2
      )}`;

      // Find the entry for the current date in the weekWeightData
      const entry = weekWeightData.find(
        (data) => data.logDate === formattedDate
      );

      // Return the weight if available, otherwise null
      return entry ? entry.Weight : null;
    });

    return { weights, labels: dayLabels };
  }, [weekWeightData]);

  const chartConfig = {
    series: [
      {
        name: "Weight",
        data: weights.filter((weight) => weight !== null),
      },
    ],
    chart: {
      type: "line",
      height: "100%",
      width: "100%", // Ensure the chart container is full width
      toolbar: { show: false },
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
        size: 6, // Ensures the marker size remains the same when hovered
      },
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
          return `${value} kg`;
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
