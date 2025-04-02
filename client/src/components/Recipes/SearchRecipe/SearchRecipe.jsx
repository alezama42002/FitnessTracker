import React from "react";
import axios from "axios";
import { useState } from "react";
import SearchedRecipe from "./SearchedRecipe";

export default function SearchRecipe() {
  const [searchItem, setSearchItem] = useState("");
  const [searchedRecipes, setSearchedRecipes] = useState([]);

  const searchFood = async (event) => {
    if (event.key === "Enter") {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/recipe/GetRecipe",
          {
            recipeName: searchItem,
          }
        );

        setSearchedRecipes(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="bg-[#19212C] px-8 mt-6 rounded-[8px] pt-6">
      <div className="bg-[#2C3441] rounded-md py-2 pl-4">
        <input
          type="text"
          placeholder="Search for recipe..."
          className="w-full focus:outline-none"
          onChange={(event) => setSearchItem(event.target.value)}
          onKeyDown={searchFood}
        />
      </div>
      <div className="searchFoodText flex flex-col items-center justify-center text-[#AFA99E] pt-8 gap-3 pb-6">
        <SearchedRecipe searchedRecipeData={searchedRecipes} />
        <p>Search for recipes to add to your profile</p>
        <p>Try searching for items like 'Protein Shake'</p>
      </div>
    </div>
  );
}
