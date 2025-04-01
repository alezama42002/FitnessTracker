import React from "react";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import { useState } from "react";
import SearchIngredient from "../components/SearchIngredient";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import SearchRecipe from "../components/SearchRecipe";
import AddRecipe from "../components/AddRecipe";

export default function Recipes() {
  const [formData, setFormData] = useState({
    recipeName: "",
    recipeDescription: "",
    totalServings: "",
  });
  const [username, setUsername] = useState(null);
  const [ingredientData, setIngredientData] = useState([]);
  const [selected, setSelected] = useState("SearchRecipe");

  const handleClick = (item) => {
    setSelected(item);
  };

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
    <div className="bg-[#0E131F] h-full">
      <Navbar />
      <div className="foodLogContainer text-white mx-16 mt-8  pb-16">
        <h1 className="text-[22px]">Recipes</h1>
        <div className="foodLogFlexContainer flex mt-8 items-center text-[#AFA99E] text-[16px] border-b-2 border-b-[#363B3D] mb-6">
          <div
            className="flex items-center gap-2 border-b-1 border-b-[#363B3D] pr-4 hover:text-[#1B9E4B] hover:border-[#1B9E4B] hover:cursor-pointer"
            onClick={() => handleClick("SearchRecipe")}
          >
            <FiSearch />
            <p>Search Recipe</p>
          </div>
          <div
            className="flex items-center gap-2 border-b-1 border-b-[#363B3D] pl-4 hover:text-[#1B9E4B] hover:border-[#1B9E4B] hover:cursor-pointer"
            onClick={() => handleClick("AddRecipe")}
          >
            <FaPlus />
            <p>Add Custom Recipe</p>
          </div>
        </div>
        {selected === "SearchRecipe" && (
          <div>
            <SearchRecipe />
          </div>
        )}
        {selected === "AddRecipe" && (
          <div>
            <AddRecipe />
          </div>
        )}
      </div>
    </div>
  );
}
