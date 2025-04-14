import React from "react";
import { useState } from "react";
import axios from "axios";
import Foods from "./Foods";

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
            page: 1,
          }
        );

        setSearchedFoods(response.data.foods);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            alert("No matching food found. Try a different keyword.");
          } else if (error.response.status === 500) {
            alert(
              "Something went wrong on the server. Please try again later."
            );
          } else {
            console.log(error);
            alert("An unexpected error occurred. Please try again.");
          }
        } else {
          console.error("Network or other error:", error);
          alert("Network error. Please check your connection.");
        }
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
        <Foods searchedFoodData={searchedFoods} searchItem={searchItem} />
        <p>Search for foods to add to your profile</p>
        <p>Try searching for items like 'chicken', 'apple', or 'rice'</p>
      </div>
    </div>
  );
}
