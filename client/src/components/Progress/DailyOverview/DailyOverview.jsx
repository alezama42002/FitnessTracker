import React from "react";
import ProgressBar from "../ProgressBar";
import PopupGoal from "../../PopUpGoal";
import { useState } from "react";

export default function DailyOverview({ amountsData }) {
  const [open, setOpen] = useState(false);

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
    <div className="bg-[#19212C] mt-10 py-6 rounded-[16px]">
      <div className="flex justify-between pr-4 items-center">
        <div className="flex flex-col gap-2 px-6 text-white">
          <h1 className="inline font-semibold">Daily Overview</h1>
          <p className="inline text-[#BDB7AF]">{currentDate}</p>
        </div>
        <div className="mr-2 relative">
          <button
            className="bg-[#1B9E4B] text-[14px] font-normal text-white px-6 py-2 rounded-[8px] cursor-pointer"
            onClick={() => setOpen(true)}
          >
            Set Goal
          </button>
          {open && (
            <PopupGoal
              onClose={() => setOpen(false)}
              onSave={() => setOpen(false)}
            />
          )}
        </div>
      </div>

      <div className="px-6 mt-6">
        <div>
          <ProgressBar
            color="#1B9E4B"
            currentValue={amountsData[4]}
            totalValue={amountsData[0]}
            name="Calories"
            unit="kcal"
          />
        </div>
        <div className="flex w-full gap-6 mt-4 sm:max-lg:flex-col">
          <div className="w-1/3 pr-1 sm:max-lg:w-full sm:max-lg:p-0">
            <ProgressBar
              color="#0844A6"
              currentValue={amountsData[5]}
              totalValue={amountsData[1]}
              name="Protein"
              unit="g"
            />
          </div>
          <div className="w-1/3 pr-1 sm:max-lg:w-full sm:max-lg:p-0">
            <ProgressBar
              color="#BE5105"
              currentValue={amountsData[6]}
              totalValue={amountsData[2]}
              name="Carbs"
              unit="g"
            />
          </div>
          <div className="w-1/3 sm:max-lg:w-full sm:max-lg:p-0">
            <ProgressBar
              color="#510797"
              currentValue={amountsData[7]}
              totalValue={amountsData[3]}
              name="Fat"
              unit="g"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
