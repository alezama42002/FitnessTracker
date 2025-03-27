import React from "react";

import { useState } from "react";
import axios from "axios";
import SearchedIngredient from "./SearchedIngredient";

export default function SearchIngredient({ addIngredient }) {
  const [searchItem, setSearchItem] = useState("");
  const [searchedFoods, setSearchedFoods] = useState([]);

  const searchFood = async (event) => {
    if (event.key === "Enter") {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/food/Search",
          {
            Name: searchItem,
          }
        );

        setSearchedFoods(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="bg-[#19212C]  rounded-[8px]">
      <div className="bg-[#2C3441] rounded-md py-2 pl-8">
        <input
          type="text"
          placeholder="Search for food items..."
          className="w-full focus:outline-none"
          onChange={(event) => setSearchItem(event.target.value)}
          onKeyDown={searchFood}
        />
      </div>
      <SearchedIngredient
        searchedFoodData={searchedFoods}
        addIngredient={addIngredient}
      />
    </div>
  );
}
