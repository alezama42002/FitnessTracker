import React from "react";
import ProgressBar from "./ProgressBar";

export default function MicroNutrients() {
  return (
    <div className="bg-[#19212C] rounded-[16px] h-full mr-[40px]  ">
      <div className="flex justify-between px-6 text-white py-6">
        <h1 className="inline font-semibold">Micronutrients</h1>
      </div>
      <div className="px-6 ">
        <ProgressBar
          color="#1B9E4B"
          currentValue={420}
          totalValue={2000}
          name="Calories"
          unit="kcal"
        />
        <ProgressBar
          color="#1B9E4B"
          currentValue={420}
          totalValue={2000}
          name="Calories"
          unit="kcal"
        />
        <ProgressBar
          color="#1B9E4B"
          currentValue={420}
          totalValue={2000}
          name="Calories"
          unit="kcal"
        />
        <ProgressBar
          color="#1B9E4B"
          currentValue={420}
          totalValue={2000}
          name="Calories"
          unit="kcal"
        />
        <ProgressBar
          color="#1B9E4B"
          currentValue={420}
          totalValue={2000}
          name="Calories"
          unit="kcal"
        />
        <ProgressBar
          color="#1B9E4B"
          currentValue={420}
          totalValue={2000}
          name="Calories"
          unit="kcal"
        />
        <ProgressBar
          color="#1B9E4B"
          currentValue={420}
          totalValue={2000}
          name="Calories"
          unit="kcal"
        />
      </div>
    </div>
  );
}
