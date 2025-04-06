import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";

export default function Food({
  name,
  logTime,
  calories,
  protein,
  carbs,
  fat,
  quantity,
  editLog,
  deleteLog,
  foodID,
}) {
  return (
    <div className="text-white flex justify-between border-b-2 border-b-[#363B3D] py-3">
      <div>
        <p>{name}</p>
      </div>
      <div className="flex gap-7 sm:max-lg:gap-3">
        <div className="flex gap-14 sm:max-lg:gap-7.5">
          <p className="">{logTime}</p>
          <p>{quantity}</p>
          <p className=" sm:max-lg:pr-0">{calories} kcal</p>
          <p className="pl-4 sm:max-lg:hidden">{protein}g</p>
          <p className="pl-4 sm:max-lg:hidden">{carbs}g</p>
          <p className="pl-4 sm:max-lg:hidden">{fat}g</p>
        </div>
        <div className="flex gap-2 items-center">
          <FaRegTrashCan
            size={20}
            onClick={() => deleteLog(foodID, quantity)}
            className="hover:cursor-pointer"
          />
          <GoPencil
            size={20}
            onClick={editLog}
            className="hover:cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
