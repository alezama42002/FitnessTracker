import React from "react";
import Navbar from "../components/Navbar";
import DailyOverview from "../components/DailyOverview";
import DailyFoods from "../components/DailyFoods";
import MicroNutrients from "../components/MicroNutrients";
import WeightGraph from "../components/LineChart";

export default function Dashboard() {
  return (
    <div className="h-screen  bg-[#0E131F]">
      <div>
        <Navbar />
        <div className="grid grid-cols-3 gap-y-8 gap-x-8 h-full">
          <div className="mx-10 w-200 col-span-2">
            <DailyOverview />
            <DailyFoods />
          </div>

          <div className="row-span-2 mt-8">
            <MicroNutrients />
          </div>
          <div className="bg-[#19212C] h-150 ml-10 rounded-[16px] col-span-2 ">
            <WeightGraph />
          </div>
        </div>
      </div>
    </div>
  );
}
