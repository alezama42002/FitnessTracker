import React from "react";
import { useEffect, useState } from "react";
import PopupQuantity from "../../PopupQuantity";
import { FaPlus } from "react-icons/fa";
import axios from "axios";

export default function SearchedRecipe({ searchedRecipeData }) {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [open, setOpen] = React.useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");

    if (storedToken) {
      const base64Url = storedToken.split(".")[1];
      const decodedData = JSON.parse(atob(base64Url));
      setToken(storedToken);
      setUsername(decodedData.name);
    }
  }, []);

  const logRecipe = async (recipeData, quantity) => {
    try {
      if (!quantity || quantity <= 0) {
        alert("Please enter a valid quantity.");
        return;
      }

      await axios.post("http://localhost:3000/api/user/LogRecipe", {
        recipeName: recipeData.recipeName,
        Username: username,
        servings: quantity,
        Calories: recipeData.totalCalories,
      });

      setQuantities((prev) => ({ ...prev, [recipeData.ID]: "" }));
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
    <div className="w-full">
      {searchedRecipeData.length > 0
        ? searchedRecipeData.map((recipe) => (
            <>
              <div
                key={recipe.ID}
                className="text-white flex justify-between pb-1 pt-3"
              >
                <div className="sm:w-65 md:w-80 lg:w-100">
                  <p>{recipe.recipeName}</p>{" "}
                </div>
                <div className="flex gap-2 items-center justify-center pr-2 relative">
                  <FaPlus
                    size={20}
                    onClick={() => handleQuantity(recipe)}
                    className="bg-[#1b9e4b] w-fit py-0.75 px-4 rounded"
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
              <div className="border-b-2 border-b-[#363B3D]">
                <p>Servings: {recipe.totalServings}</p>
                <p>Calories: {recipe.totalCalories} kcal</p>
                <p>Protein: {recipe.totalProtein}g</p>
                <p>Carbs: {recipe.totalCarbs}g</p>
                <p>Fat: {recipe.totalFats}g</p>
              </div>
            </>
          ))
        : null}
    </div>
  );
}
