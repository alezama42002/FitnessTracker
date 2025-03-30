import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";

export default function Food({ name, logTime, calories, protein, carbs, fat }) {
  const deleteFood = () => {};

  const editFood = () => {};

  return (
    <div className="text-white flex justify-between border-b-2 border-b-[#363B3D] py-3">
      <div className="sm:max-lg:pl-">
        <p>{name}</p>
      </div>
      <div className="flex gap-6">
        <p className="pr-[1.2em]">{logTime}</p>
        <p className="pr-11 sm:max-lg:pr-0">{calories} kcal</p>
        <p className="pr-14 sm:max-lg:hidden">{protein}g</p>
        <p className="pr-10 sm:max-lg:hidden">{carbs}g</p>
        <p className="pr-2 sm:max-lg:hidden">{fat}g</p>

        <div className="flex gap-2 items-center sm:max-lg:ml- ">
          <FaRegTrashCan
            size={20}
            onClick={deleteFood}
            className="hover:cursor-pointer"
          />
          <GoPencil
            size={20}
            onClick={editFood}
            className="hover:cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
