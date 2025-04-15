import React from "react";
import Food from "./Food";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Foods({ searchedFoodData, searchItem }) {
  const [newSearchedFoodData, setNewSearchedFoodData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Sync state when prop changes
    if (searchedFoodData?.length > 0) {
      setNewSearchedFoodData(searchedFoodData);
      setPage(1); // reset page if new search
    }
  }, [searchedFoodData]);

  const handleMoreFoods = async () => {
    // Handle the more foods action
    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      const response = await axios.post(`${apiUrl}/food/Search`, {
        Name: searchItem,
        page: page + 1,
      });
      if (response.data.foods?.length) {
        setNewSearchedFoodData(response.data.foods);
        setPage(page + 1);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          alert("No matching food found. Try a different keyword.");
        } else if (error.response.status === 500) {
          alert("Something went wrong on the server. Please try again later.");
        } else {
          console.log(error);
          alert("An unexpected error occurred. Please try again.");
        }
      } else {
        console.error("Network or other error:", error);
        alert("Network error. Please check your connection.");
      }
    }
  };

  return (
    <div className="w-full">
      {newSearchedFoodData.length > 0 &&
        newSearchedFoodData.map((food) => <Food key={food.ID} food={food} />)}

      {newSearchedFoodData.length > 0 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleMoreFoods}
            className="px-4 py-2 bg-[#1b9e4b] text-white rounded hover:bg-blue-600"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
