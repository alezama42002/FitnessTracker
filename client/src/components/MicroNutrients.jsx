import React from "react";
import ProgressBar from "./ProgressBar";

export default function MicroNutrients({ nutritionData }) {
  return (
    <div className="bg-[#19212C] rounded-[16px] mr-[40px] pb-6 ">
      <div className="px-6 text-white pb-6 pt-4">
        <h1 className=" font-semibold">Micronutrients</h1>
      </div>
      <div className="px-6 flex flex-col gap-4 ">
        <ProgressBar
          color="#1B9E4B"
          currentValue={nutritionData[0]}
          totalValue={34}
          name="Fiber"
          unit="g"
        />
        <ProgressBar
          color="#1B9E4B"
          currentValue={nutritionData[1]}
          totalValue={900}
          name="Vitamin A"
          unit="mcg"
        />
        <ProgressBar
          color="#1B9E4B"
          currentValue={nutritionData[2]}
          totalValue={1.7}
          name="Vitamin B6"
          unit="mg"
        />
        <ProgressBar
          color="#1B9E4B"
          currentValue={nutritionData[3]}
          totalValue={2.4}
          name="Vitamin B12"
          unit="mcg"
        />
        <ProgressBar
          color="#1B9E4B"
          currentValue={nutritionData[4]}
          totalValue={90}
          name="Vitamin C"
          unit="mg"
        />
        <ProgressBar
          color="#1B9E4B"
          currentValue={nutritionData[5]}
          totalValue={20}
          name="Vitamin D"
          unit="mg"
        />
        <ProgressBar
          color="#1B9E4B"
          currentValue={nutritionData[6]}
          totalValue={15}
          name="Vitamin E"
          unit="mg"
        />
        <ProgressBar
          color="#1B9E4B"
          currentValue={nutritionData[7]}
          totalValue={120}
          name="Vitamin K"
          unit="mcg"
        />
        <ProgressBar
          color="#1B9E4B"
          currentValue={nutritionData[8]}
          totalValue={1300}
          name="Calcium"
          unit="mg"
        />
        <ProgressBar
          color="#1B9E4B"
          currentValue={nutritionData[9]}
          totalValue={18}
          name="Iron"
          unit="mg"
        />
        <ProgressBar
          color="#1B9E4B"
          currentValue={nutritionData[10]}
          totalValue={4700}
          name="Potassium"
          unit="mg"
        />
        <ProgressBar
          color="#1B9E4B"
          currentValue={nutritionData[11]}
          totalValue={420}
          name="Mangesium"
          unit="mg"
        />
        <ProgressBar
          color="#1B9E4B"
          currentValue={nutritionData[12]}
          totalValue={2300}
          name="Sodium"
          unit="mg"
        />
        <ProgressBar
          color="#1B9E4B"
          currentValue={nutritionData[13]}
          totalValue={11}
          name="Zinc"
          unit="mg"
        />
      </div>
    </div>
  );
}
