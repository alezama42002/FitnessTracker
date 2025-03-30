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
        <h1 className="text-white text-[20px] sm:max-lg:text-[18px]">{name}</h1>
        <FaPlus
          size={25}
          className="suggestion-plus bg-[#16a34a] text-white p-1.5 rounded-[6px] cursor-pointer "
        />
      </div>
      <p className="text-[#9CA3AF] text-[16px] pt-2 sm:max-lg:text-[14px]">{description}</p>
      <div className="grid grid-cols-4 grid-rows-2 justify-items-center  text-white pt-2">
        <div className="text-[18px] sm:max-lg:text-[16px] font-semibold">
          <p>Calories</p>
        </div>
        <div className="text-[18px] sm:max-lg:text-[16px] font-semibold">
          <p>Protein</p>
        </div>
        <div className="text-[18px] sm:max-lg:text-[16px] font-semibold">
          <p>Fat</p>
        </div>
        <div className="text-[18px] sm:max-lg:text-[16px] font-semibold">
          <p>Carbs</p>
        </div>
        <div className="text-[16px] sm:max-lg:text-[14px]">
          <p>{calories} kcal</p>
        </div>
        <div className="text-[16px] sm:max-lg:text-[14px]">
          <p>{protein}g</p>
        </div>
        <div className="text-[16px] sm:max-lg:text-[14px]">
          <p>{fat}g</p>
        </div>
        <div className="text-[16px] sm:max-lg:text-[14px]">
          <p>{carbs}g</p>
        </div>
      </div>
    </div>
  );
}
