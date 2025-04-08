import React from "react";
import { FaPlus } from "react-icons/fa6";

export default function Recipe({ recipeData }) {
  return (
    <div className="bg-[#2C3441] rounded-[8px] px-4 ">
      <div className="flex justify-between items-center  rounded-[16px]  pt-2">
        <h1 className="text-white text-[20px] sm:max-lg:text-[18px]">
          {recipeData.recipeName}
        </h1>
        <FaPlus
          size={25}
          className="suggestion-plus bg-[#16a34a] px-4 py-0.5 w-fit h-5 text-white rounded-[6px] cursor-pointer "
        />
      </div>
      <p className="text-[#9CA3AF] text-[16px]  sm:max-lg:text-[14px]">
        {recipeData.Description}
      </p>
      <div className="grid grid-cols-4 grid-rows-2 justify-items-center  text-white pt-2 pb-4">
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
        <div className="text-[16px]  text-[#9CA3AF] sm:max-lg:text-[14px]">
          <p>{recipeData.totalCalories} kcal</p>
        </div>
        <div className="text-[16px] text-[#9CA3AF] sm:max-lg:text-[14px]">
          <p>{recipeData.totalProtein}g</p>
        </div>
        <div className="text-[16px] text-[#9CA3AF] sm:max-lg:text-[14px]">
          <p>{recipeData.totalFats}g</p>
        </div>
        <div className="text-[16px] text-[#9CA3AF] sm:max-lg:text-[14px]">
          <p>{recipeData.totalCarbs}g</p>
        </div>
      </div>
    </div>
  );
}
