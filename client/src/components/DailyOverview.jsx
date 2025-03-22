import React from "react";
import ProgressBar from "./ProgressBar";

export default function DailyOverview({ currentAmounts, totalAmounts }) {
  const getCurrentFormattedDate = () => {
    const date = new Date();
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const currentDate = getCurrentFormattedDate();
  return (
    <div className="bg-[#19212C] mt-8 w-full py-6 rounded-[16px]">
      <div className="flex justify-between px-6 text-white">
        <h1 className="inline font-semibold">Daily Overview</h1>
        <p className="inline text-[#BDB7AF]">{currentDate}</p>
      </div>
      <div className="px-6 mt-8">
        <div>
          <ProgressBar
            color="#1B9E4B"
            currentValue={420}
            totalValue={2000}
            name="Calories"
            unit="kcal"
          />
        </div>
        <div className="flex w-full gap-2 mt-4">
          <div className="w-1/3 pr-1">
            <ProgressBar
              color="#1B9E4B"
              currentValue={420}
              totalValue={2000}
              name="Protein"
              unit="g"
            />
          </div>
          <div className="w-1/3 pr-1">
            <ProgressBar
              color="#1B9E4B"
              currentValue={420}
              totalValue={2000}
              name="Carbs"
              unit="g"
            />
          </div>
          <div className="w-1/3">
            <ProgressBar
              color="#1B9E4B"
              currentValue={420}
              totalValue={2000}
              name="Fat"
              unit="g"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
