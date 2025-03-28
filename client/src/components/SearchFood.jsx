import React from "react";
import { useState } from "react";
import axios from "axios";
import SearchedFood from "./SearchedFood";

export default function SearchFood() {
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
    <div className="bg-[#19212C] px-8 mt-6 rounded-[8px] pt-6">
      <div className="bg-[#2C3441] rounded-md py-2 pl-4">
        <input
          type="text"
          placeholder="Search for food items..."
          className="w-full focus:outline-none"
          onChange={(event) => setSearchItem(event.target.value)}
          onKeyDown={searchFood}
        />
      </div>
      <div className="searchFoodText flex flex-col items-center justify-center text-[#AFA99E] pt-8 gap-3 pb-6">
        <SearchedFood searchedFoodData={searchedFoods} />
        <p>Search for foods to add to your profile</p>
        <p>Try searching for items like 'chicken', 'apple', or 'rice'</p>
      </div>
    </div>
  );
}
