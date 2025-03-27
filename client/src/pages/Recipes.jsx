import React from "react";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import { useState } from "react";
import SearchIngredient from "../components/SearchIngredient";
import axios from "axios";

export default function Recipes() {
  const [formData, setFormData] = useState({
    recipeName: "",
    recipeDescription: "",
    totalServings: "",
  });
  const [username, setUsername] = useState(null);
  const [ingredientData, setIngredientData] = useState([]);

  const addIngredient = (food, quantity) => {
    const macros = food.macros
      .match(/\d+(\.\d+)?/g)
      .map((num) => Math.round(parseFloat(num)));

    const foodData = {
      foodID: food.ID,
      servingSize: macros[0],
      foodName: food.name,
      foodBrand: food.brand,
      Calories: macros[1],
      Protein: macros[4],
      Carbohydrates: macros[3],
      Fats: macros[2],
      Quantity: quantity,
    };
    setIngredientData((prevIngredients) => [...prevIngredients, foodData]);
    console.log("Ingredient Added");
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const addRecipe = async () => {
    const storedToken = localStorage.getItem("accessToken");

    if (storedToken) {
      const base64Url = storedToken.split(".")[1];
      const decodedData = JSON.parse(atob(base64Url));
      setUsername(decodedData.name);
    }

    try {
      await axios.post("http://localhost:3000/api/recipe/AddRecipe", {
        Username: username,
        foodsData: ingredientData,
        recipeName: formData.recipeName,
        recipeDescription: formData.recipeDescription,
        totalServings: formData.totalServings,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen bg-[#0E131F]">
      <Navbar />
      <div className="mx-16">
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
            <div class="inline-flex items-center gap-2 pt-4 pb-6">
              <div class="relative inline-block w-11 h-5 ">
                <input
                  id="switch-component-on"
                  type="checkbox"
                  class="peer appearance-none w-11 h-5 bg-[#0E131F] rounded-full checked:bg-[#1B9E4B] cursor-pointer transition-colors duration-300"
                />
                <label
                  for="switch-component-on"
                  class="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer"
                ></label>
              </div>

              <label
                for="switch-component-on"
                class="text-[#AFA99E] text-sm cursor-pointer"
              >
                Public Recipe
              </label>
            </div>
            <div className="pb-6">
              <h1>Search Ingredient</h1>
              <SearchIngredient addIngredient={addIngredient} />
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
    </div>
  );
}
