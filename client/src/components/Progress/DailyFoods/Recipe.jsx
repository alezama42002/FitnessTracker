import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";

export default function Recipe({ recipeData }) {
  const deleteLog = async () => {
    // Logic to delete the log
    console.log("Delete log for recipe ID:", recipeData.recipeID);
  };
  const editLog = () => {
    // Logic to edit the log
    console.log("Edit log for recipe ID:", recipeData.recipeID);
  };

  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_36px] sm:max-md:grid-cols-[1fr_1fr_1fr_36px] text-white border-b-2 border-b-[#363B3D] py-3 items-center">
      <p>{recipeData.Name}</p>
      <p className="justify-self-center">{recipeData.logTime}</p>
      <p className="justify-self-center">{recipeData.Calories} kcal</p>
      <p className="justify-self-center sm:max-md:hidden">
        {recipeData.Protein}g
      </p>
      <p className="justify-self-center sm:max-md:hidden">
        {recipeData.Carbs}g
      </p>
      <p className="justify-self-center sm:max-md:hidden">{recipeData.Fat}g</p>
      <div className="flex gap-2">
        <FaRegTrashCan onClick={deleteLog} className="cursor-pointer" />
        <GoPencil onClick={editLog} className="cursor-pointer" />
      </div>
    </div>
  );
}
