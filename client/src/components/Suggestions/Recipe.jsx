import React from "react";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { useState } from "react";
import PopupQuantity from "../PopupQuantity";

export default function Recipe({ recipeData }) {
  const [open, setOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const logRecipe = async (recipeData, quantity) => {
    try {
      if (!quantity || quantity <= 0) {
        alert("Please enter a valid quantity.");
        return;
      }

      const username = localStorage.getItem("Username");
      const apiUrl = import.meta.env.VITE_API_URL;

      await axios.post(`${apiUrl}/user/LogRecipe`, {
        recipeName: recipeData.recipeName,
        Username: username,
        servings: quantity,
        Calories: recipeData.totalCalories,
      });
    } catch (error) {
      if (error.response) {
        if (error.response.status === 500) {
          alert("Something went wrong on the server. Please try again later.");
        } else {
          console.log(error);
          alert(`Error: ${error.response.data?.error || "Unexpected error."}`);
        }
      } else {
        console.error("Network or other error:", error);
        alert("Network error. Please check your connection.");
      }
    }
  };

  const handleQuantity = (food) => {
    setSelectedRecipe(food);
    setOpen(true);
  };

  return (
    <div className="bg-[#2C3441] rounded-[8px] px-4 ">
      <div className="flex justify-between items-center  rounded-[16px]  pt-2">
        <h1 className="text-white text-[20px] sm:max-lg:text-[18px]">
          {recipeData.recipeName}
        </h1>
        <div className="flex gap-2 items-center justify-center pr-2 relative">
          <FaPlus
            size={25}
            className="suggestion-plus bg-[#16a34a] px-4 py-0.5 w-fit h-5 text-white rounded-[6px] cursor-pointer "
            onClick={() => handleQuantity(recipeData)}
          />
          {open && (
            <PopupQuantity
              food={selectedRecipe}
              text={"Enter Quantity"}
              onClose={() => setOpen(false)}
              onSave={(quantity) => {
                logRecipe(selectedRecipe, quantity);
                setOpen(false);
              }}
            />
          )}
        </div>
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
