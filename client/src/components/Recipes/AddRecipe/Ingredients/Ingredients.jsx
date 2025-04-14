import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Ingredient from "./Ingredient";

export default function SearchedIngredient({
  searchedFoodData,
  searchItem,
  addIngredient,
}) {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [newSearchedFoodData, setNewSearchedFoodData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");

    if (storedToken) {
      const base64Url = storedToken.split(".")[1];
      const decodedData = JSON.parse(atob(base64Url));
      setToken(storedToken);
      setUsername(decodedData.name);

      // Sync state when prop changes
      if (searchedFoodData?.length > 0) {
        setNewSearchedFoodData(searchedFoodData);
        setPage(1); // reset page if new search
      }
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
        newSearchedFoodData.map((food) => (
          <Ingredient key={food.ID} food={food} addIngredient={addIngredient} />
        ))}

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
