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
    <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_36px] sm:max-md:grid-cols-[1fr_1fr_1fr_36px] text-white border-b-2 border-b-[#363B3D] py-3 items-center">
      <p>{name}</p>
      <p className="justify-self-center">{logTime}</p>
      <p className="justify-self-center">{calories} kcal</p>
      <p className="justify-self-center sm:max-md:hidden">{protein}g</p>
      <p className="justify-self-center sm:max-md:hidden">{carbs}g</p>
      <p className="justify-self-center sm:max-md:hidden">{fat}g</p>
      <div className="flex gap-2">
        <FaRegTrashCan onClick={deleteFood} className="cursor-pointer" />
        <GoPencil onClick={editFood} className="cursor-pointer" />
      </div>
    </div>

    // <div className="text-white flex justify-between border-b-2 border-b-[#363B3D] py-3">
    //   <div>
    //     <p>{name}</p>
    //   </div>
    //   <div className="flex gap-7 sm:max-lg:gap-3">
    //     <div className="flex gap-8 sm:max-lg:gap-6">
    //       <p className="">{logTime}</p>
    //       <p className=" sm:max-lg:pr-0">{calories} kcal</p>
    //       <p className="pl-4 sm:max-lg:hidden">{protein}g</p>
    //       <p className="pl-4 sm:max-lg:hidden">{carbs}g</p>
    //       <p className="pl-4 sm:max-lg:hidden">{fat}g</p>
    //     </div>
    //     <div className="flex gap-2 items-center">
    //       <FaRegTrashCan
    //         size={20}
    //         onClick={deleteFood}
    //         className="hover:cursor-pointer"
    //       />
    //       <GoPencil
    //         size={20}
    //         onClick={editFood}
    //         className="hover:cursor-pointer"
    //       />
    //     </div>
    //   </div>
    // </div>
  );
}
