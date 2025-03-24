import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";

export default function Food({ name, logTime, calories, protein, carbs, fat }) {
  const deleteFood = () => {};

  const editFood = () => {};

  return (
    <div className="text-white flex border-b-2 border-b-[#363B3D] py-3">
      <div className="w-52">
        <p>{name}</p>
      </div>

      <div className="flex gap-13">
        <p className="pl-6">{logTime}</p>
        <p className="">{calories} kcal</p>
        <p className="pl-6.5">{protein}g</p>
        <p className="pl-4">{carbs}g</p>
        <p className="pl-0.5">{fat}g</p>
      </div>
      <div className="flex gap-2 items-center justify-center pl-7">
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
  );
}
