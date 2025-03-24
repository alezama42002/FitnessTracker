import React from "react";
import Navbar from "../components/Navbar";
import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import SearchFood from "../components/SearchFood";
import AddFood from "../components/AddFood";
import { useState } from "react";

export default function FoodLog() {
  const [selected, setSelected] = useState("SearchFood");

  const handleClick = (item) => {
    setSelected(item);
  };

  return (
    <div className="bg-[#0E131F] h-screen">
      <Navbar />
      <div className="text-white mx-16 mt-8  ">
        <h1 className="text-[22px]">Foods</h1>
        <div className="flex mt-8 items-center text-[#AFA99E] text-[16px] border-b-2 border-b-[#363B3D] mb-6">
          <div
            className="flex items-center gap-2 border-b-1 border-b-[#363B3D] pr-4 hover:text-[#1B9E4B] hover:border-[#1B9E4B] hover:cursor-pointer"
            onClick={() => handleClick("SearchFood")}
          >
            <FiSearch />
            <p>Search Foods</p>
          </div>
          <div
            className="flex items-center gap-2 border-b-1 border-b-[#363B3D] pl-4 hover:text-[#1B9E4B] hover:border-[#1B9E4B] hover:cursor-pointer"
            onClick={() => handleClick("AddFood")}
          >
            <FaPlus />
            <p>Add Custom Food</p>
          </div>
        </div>
        {selected === "SearchFood" && (
          <div>
            <SearchFood />
          </div>
        )}
        {selected === "AddFood" && (
          <div>
            <AddFood />
          </div>
        )}
      </div>
    </div>
  );
}
