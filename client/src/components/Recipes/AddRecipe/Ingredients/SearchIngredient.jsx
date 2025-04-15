import React from "react";
import { useState } from "react";
import axios from "axios";
import Ingredients from "./Ingredients";

export default function SearchIngredient({ addIngredient }) {
  const [searchItem, setSearchItem] = useState("");
  const [searchedFoods, setSearchedFoods] = useState([]);

  const searchFood = async (event) => {
    if (event.key === "Enter") {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;

        const response = await axios.post(`${apiUrl}/food/Search`, {
          Name: searchItem,
          page: 1,
        });

        setSearchedFoods(response.data.foods);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="bg-[#19212C]  rounded-[8px]">
      <div className="bg-[#2C3441] rounded-md py-2 pl-3">
        <input
          type="text"
          placeholder="Search for ingredients..."
          className="w-full focus:outline-none"
          onChange={(event) => setSearchItem(event.target.value)}
          onKeyDown={searchFood}
        />
      </div>
      <div className="searchFoodText flex flex-col items-center justify-center text-[#AFA99E] pt-8 gap-3 pb-6">
        <Ingredients
          searchedFoodData={searchedFoods}
          searchItem={searchItem}
          addIngredient={addIngredient}
        />
      </div>
    </div>
  );
}
