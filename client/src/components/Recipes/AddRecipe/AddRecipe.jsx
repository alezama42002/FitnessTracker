import React from "react";
import Input from "../../Input";
import { useState } from "react";
import Ingredients from "./Ingredients/SearchIngredient";
import axios from "axios";

export default function AddRecipe() {
  const [formData, setFormData] = useState({
    recipeName: "",
    recipeDescription: "",
    totalServings: "",
  });
  const [username, setUsername] = useState(null);
  const [ingredientData, setIngredientData] = useState([]);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const addIngredient = (food, quantity) => {
    const [servingSizePart, macroPart] = food.macros.split("-");

    const servingSize = servingSizePart.trim();

    const macros =
      macroPart
        ?.match(/\d+(\.\d+)?/g)
        ?.map((num) => Math.round(parseFloat(num))) || [];

    const foodData = {
      foodID: food.ID,
      servingSize: servingSize,
      foodName: food.name,
      foodBrand: food.brand,
      Calories: macros[0],
      Protein: macros[3],
      Carbohydrates: macros[2],
      Fats: macros[1],
      Quantity: quantity,
    };
    setIngredientData((prevIngredients) => [...prevIngredients, foodData]);
    console.log("Ingredient Added");
  };

  const addRecipe = async () => {
    const Username = localStorage.getItem("Username");
    const token = localStorage.getItem("accessToken");

    try {
      await axios.post(
        "http://localhost:3000/api/recipe/AddRecipe",
        {
          Username: Username,
          foodsData: ingredientData,
          recipeName: formData.recipeName,
          recipeDescription: formData.recipeDescription,
          totalServings: formData.totalServings,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      if (error.response) {
        if (error.response.status === 422) {
          const errorMessage =
            error.response.data?.errors?.msg || "Invalid input data.";
          alert(errorMessage);
        } else if (error.response.status === 500) {
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

  return (
    <div className="mx-2">
      <h1 className="text-[22px] text-white pt-4">Create Recipe </h1>
      <div className="bg-[#19212C] text-white mt-6 p-6 rounded-[8px]">
        <div>
          <Input
            inputName="Recipe Name"
            field="recipeName"
            sendData={handleInputChange}
          />
          <Input
            inputName="Recipe Description"
            field="recipeDescription"
            sendData={handleInputChange}
          />
          <Input
            inputName="Total Servings"
            field="totalServings"
            sendData={handleInputChange}
          />
          <div className="pb-6">
            <h1>Search Ingredient</h1>
            <Ingredients addIngredient={addIngredient} />
          </div>
        </div>
        <button
          type="button"
          onClick={addRecipe}
          className="bg-[#1B9E4B] rounded-[8px] px-14 mt-4 mb-2 text-white font-normal text-[18px] cursor-pointer w-full py-2"
        >
          Add Recipe
        </button>
      </div>
    </div>
  );
}
