import React from "react";
import { FaPlus } from "react-icons/fa6";

export default function Recipe({
  name,
  description,
  calories,
  protein,
  carbs,
  fat,
}) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-white text-[20px]">{name}</h1>
        <FaPlus size={30} className="bg-[#16a34a] text-white p-2 rounded-[8px] cursor-pointer"/>
      </div>
      <p className="text-[#9CA3AF] text-[16px]">{description}</p>
      <div className="grid grid-cols-4 grid-rows-2  text-white pt-2">
        <div className="text-[18px] font-semibold">
          <p>Calories</p>
        </div>
        <div className="text-[18px] font-semibold">
          <p>Protein</p>
        </div>
        <div className="text-[18px] font-semibold">
          <p>Fat</p>
        </div>
        <div className="text-[18px] font-semibold">
          <p>Carbs</p>
        </div>
        <div className="text-[16px]">
          <p>{calories} kcal</p>
        </div>
        <div className="text-[16px]">
          <p>{protein}g</p>
        </div>
        <div className="text-[16px]">
          <p>{fat}g</p>
        </div>
        <div className="text-[16px]">
          <p>{carbs}g</p>
        </div>
      </div>
    </div>
  );
}
