import React from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import SearchRecipe from "../components/Recipes/SearchRecipe/SearchRecipe";
import AddRecipe from "../components/Recipes/AddRecipe/AddRecipe";

export default function Recipes() {
  const [formData, setFormData] = useState({
    recipeName: "",
    recipeDescription: "",
    totalServings: "",
  });
  const [selected, setSelected] = useState("SearchRecipe");

  const handleClick = (item) => {
    setSelected(item);
  };

  return (
    <div className="bg-[#0E131F] h-full">
      <Navbar />
      <div className="foodLogContainer text-white mx-16 mt-8  pb-16">
        <h1 className="text-[22px]">Recipes</h1>
        <div className="foodLogFlexContainer flex mt-8 items-center text-[#AFA99E] text-[16px] border-b-2 border-b-[#363B3D] mb-6">
          <div
            className="flex items-center gap-2 border-b-1 border-b-[#363B3D] pr-4 hover:text-[#1B9E4B] hover:border-[#1B9E4B] hover:cursor-pointer"
            onClick={() => handleClick("SearchRecipe")}
          >
            <FiSearch />
            <p>Search Recipe</p>
          </div>
          <div
            className="flex items-center gap-2 border-b-1 border-b-[#363B3D] pl-4 hover:text-[#1B9E4B] hover:border-[#1B9E4B] hover:cursor-pointer"
            onClick={() => handleClick("AddRecipe")}
          >
            <FaPlus />
            <p>Add Custom Recipe</p>
          </div>
        </div>
        {selected === "SearchRecipe" && (
          <div>
            <SearchRecipe />
          </div>
        )}
        {selected === "AddRecipe" && (
          <div>
            <AddRecipe />
          </div>
        )}
      </div>
    </div>
  );
}
