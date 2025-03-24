import React from "react";
import Food from "./Food";

export default function DailyFoods() {
  return (
    <div className="bg-[#19212C] mt-8 w-full py-6 rounded-[16px] ]">
      <div className="flex justify-between px-6 text-white">
        <h1 className="inline font-semibold">Today's Food</h1>
      </div>
      <div className="px-6 mt-8 text-[14px]">
        <div className="text-white flex justify-between border-b-2 border-b-[#363B3D] pb-3 font-semibold">
          <p>Food</p>
          <div className="flex gap-14 pr-20">
            <p>Time</p>
            <p>Calories</p>
            <p>Protein</p>
            <p>Carbs</p>
            <p>Fat</p>
          </div>
        </div>
        <div>
          <Food
            name="Grilled Chicken Salad"
            logTime="12:45 PM"
            calories="420"
            protein="35"
            carbs="15"
            fat="22"
          />
          <Food
            name="Egg"
            logTime="12:45 PM"
            calories="420"
            protein="35"
            carbs="15"
            fat="22"
          />
        </div>
      </div>
    </div>
  );
}
