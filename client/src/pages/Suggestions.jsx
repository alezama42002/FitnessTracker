import React from "react";
import Navbar from "../components/Navbar";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import Recipe from "../components/Recipe";

export default function Suggestions() {
  const [clickedAll, setClickedAll] = useState(false);
  const handleClickAll = () => {
    setClickedAll(!clickedAll);
  };

  const [clickedLowFat, setClickedLowFat] = useState(false);
  const handleClickLowFat = () => {
    setClickedLowFat(!clickedLowFat);
  };

  const [clickedHighProtein, setClickedHighProtein] = useState(false);
  const handleClickHighProtein = () => {
    setClickedHighProtein(!clickedHighProtein);
  };

  const [clickedLowCarbs, setClickedLowCarbs] = useState(false);
  const handleClickLowCarbs = () => {
    setClickedLowCarbs(!clickedLowCarbs);
  };

  const [clickedHighCarbs, setClickedHighCarbs] = useState(false);
  const handleClickHighCarbs = () => {
    setClickedHighCarbs(!clickedHighCarbs);
  };
  return (
    <div className="h-screen bg-[#0E131F]">
      <Navbar />
      <div className="mx-16 my-8">
        <h1 className="text-white text-[22px] pb-4">Suggestions</h1>
        <p className="text-[#AFA99E]">
          Find recipes and meals that match your needs
        </p>
      </div>
      <div className="bg-[#19212C] rounded-[8px] px-6 py-4 mx-16">
        <div className="bg-[#2c3441] text-[14px] rounded-md py-2 pl-8">
          <div className="flex items-center gap-2">
            <FiSearch color="#CCCCCC" />
            <input
              type="text"
              placeholder="Search for recipes or enter your requirements..."
              className="w-full focus:outline-none text-white  placeholder-[#CCCCCC]"
            />
          </div>
        </div>
        <div className="flex gap-2 pt-6">
          <button
            onClick={handleClickAll}
            className={`bg-[#2c3441] text-[14px] rounded-[8px] py-2 px-6 text-white hover:bg-[#16a34a] active:bg-[#16a34a] ${
              clickedAll ? "bg-[#16a34a]" : "bg-blue-500"
            }`}
          >
            All
          </button>

          <button
            onClick={handleClickLowFat}
            className={`bg-[#2c3441] text-[14px] rounded-[8px] py-2 px-6 text-white hover:bg-[#16a34a] active:bg-[#16a34a] ${
              clickedLowFat ? "bg-[#16a34a]" : "bg-blue-500"
            }`}
          >
            Low Fat
          </button>

          <button
            onClick={handleClickHighProtein}
            className={`bg-[#2c3441] text-[14px] rounded-[8px] py-2 px-6 text-white hover:bg-[#16a34a] active:bg-[#16a34a] ${
              clickedHighProtein ? "bg-[#16a34a]" : "bg-blue-500"
            }`}
          >
            High Protein
          </button>

          <button
            onClick={handleClickLowCarbs}
            className={`bg-[#2c3441] text-[14px] rounded-[8px] py-2 px-6 text-white hover:bg-[#16a34a] active:bg-[#16a34a] ${
              clickedLowCarbs ? "bg-[#16a34a]" : "bg-blue-500"
            }`}
          >
            Low Carbs
          </button>

          <button
            onClick={handleClickHighCarbs}
            className={`bg-[#2c3441] text-[14px] rounded-[8px] py-2 px-6 text-white hover:bg-[#16a34a] active:bg-[#16a34a] ${
              clickedHighCarbs ? "bg-[#16a34a]" : "bg-blue-500"
            }`}
          >
            High Carbs
          </button>
        </div>
      </div>
      <div className="bg-[#19212C] rounded-[8px] mt-6 mx-16 px-4 py-4">
        <Recipe
          name="High Protein Chicken Bowl"
          description="A protein-rich meal perfect for muscle building"
          calories="450"
          protein="45"
          carbs="30"
          fat="15"
        />
      </div>
      <div className="bg-[#19212C] rounded-[8px] mt-6 mx-16 px-4 py-4">
        <Recipe
          name="High Protein Chicken Bowl"
          description="A protein-rich meal perfect for muscle building"
          calories="450"
          protein="45"
          carbs="30"
          fat="15"
        />
      </div>
    </div>
  );
}
