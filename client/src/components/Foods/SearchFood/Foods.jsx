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
      const response = await axios.post(
        "http://localhost:3000/api/food/Search",
        {
          Name: searchItem,
          page: page + 1,
        }
      );
      if (response.data.foods?.length) {
        setNewSearchedFoodData(response.data.foods);
        setPage(page + 1);
      }
    } catch (error) {
      console.log(error);
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
