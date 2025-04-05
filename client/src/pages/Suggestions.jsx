import React from "react";
import Navbar from "../components/Navbar";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import Recipe from "../components/Suggestions/Recipe";
import axios from "axios";

export default function Suggestions() {
  const [clickedAll, setClickedAll] = useState(false);
  const [clickedLowFat, setClickedLowFat] = useState(false);
  const [clickedHighProtein, setClickedHighProtein] = useState(false);
  const [clickedLowCarbs, setClickedLowCarbs] = useState(false);
  const [clickedHighCarbs, setClickedHighCarbs] = useState(false);
  const [tempState, setTempState] = useState(null);
  const [recipeName, setRecipeName] = useState("");
  const [selection, setSelection] = useState("Recipes");
  const [recipes, setRecipes] = useState([]);

  const resetOptions = () => {
    setClickedAll(false);
    setClickedLowFat(false);
    setClickedHighProtein(false);
    setClickedLowCarbs(false);
    setClickedHighCarbs(false);
  };

  const handleInputChange = (event) => {
    setRecipeName(event.target.value);
  };

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      findSpecificRecipe(recipeName);
    }
  };

  const selectType = (macroRequest) => {
    if (selection === "Food") {
      findFoods(macroRequest);
    } else {
      findRecipes(macroRequest);
    }
  };

  const handleClickAll = () => {
    setTempState(clickedAll);
    resetOptions();
    setClickedAll(!tempState);
    selectType("All");
  };

  const handleClickLowFat = () => {
    setTempState(clickedLowFat);
    resetOptions();
    setClickedLowFat(!tempState);
    selectType("Low Fat");
  };

  const handleClickHighProtein = () => {
    setTempState(clickedHighProtein);
    resetOptions();
    setClickedHighProtein(!tempState);
    selectType("High Protein");
  };

  const handleClickLowCarbs = () => {
    setTempState(clickedLowCarbs);
    resetOptions();
    setClickedLowCarbs(!tempState);
    selectType("Low Carb");
  };

  const handleClickHighCarbs = () => {
    setTempState(clickedHighCarbs);
    resetOptions();
    setClickedHighCarbs(!tempState);
    selectType("High Carb");
  };

  const findRecipes = async (macroRequest) => {
    try {
      const recipes = await axios.post(
        "http://localhost:3000/api/recipe/Reccomend",
        { macroRequest: macroRequest }
      );
      console.log(recipes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const findSpecificRecipe = async () => {
    try {
      const recipe = await axios.post(
        "http://localhost:3000/api/recipe/GetRecipe",
        { recipeName: recipeName }
      );
      console.log(recipe.data);
    } catch (error) {
      console.log(error);
    }
  };

  const findFoods = async (macroRequest) => {
    try {
      const foods = await axios.post(
        "http://localhost:3000/api/food/Recommend",
        {
          MacroRequest: macroRequest,
        }
      );
      console.log(foods.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen bg-[#0E131F]">
      <Navbar />
      <div className="mx-16 my-8 sm:max-lg:mx-8">
        <h1 className="text-white text-[22px] pb-4">Suggestions</h1>
        <p className="text-[#AFA99E]">
          Find recipes and meals that match your needs
        </p>
      </div>
      <div className="bg-[#19212C] rounded-[8px] px-6 py-4 mx-16 sm:max-lg:mx-8 sm:max-lg:px-4">
        <div className="bg-[#2c3441] text-[14px] rounded-md py-2 pl-8 sm:max-lg:pl-4">
          <div className="flex items-center gap-2">
            <FiSearch color="#CCCCCC" />
            <input
              type="text"
              onChange={handleInputChange}
              onKeyDown={handleSearch}
              placeholder="Search for recipes or enter your requirements..."
              className="w-full focus:outline-none text-white  placeholder-[#CCCCCC]"
            />
          </div>
        </div>
        <div className="suggestionBtn-Container flex gap-6 pt-6">
          <button
            onClick={handleClickAll}
            className={`bg-[#2c3441] text-[14px] rounded-[8px] py-2 px-6 text-white hover:bg-[#16a34a] active:bg-[#16a34a] ${
              clickedAll ? "bg-[#16a34a]" : "bg-blue-500"
            }`}
          >
            All
          </button>

          <button
            onClick={handleClickLowFat}
            className={`bg-[#2c3441] text-[14px] rounded-[8px] py-2 px-6 text-white hover:bg-[#16a34a] active:bg-[#16a34a] ${
              clickedLowFat ? "bg-[#16a34a]" : "bg-blue-500"
            }`}
          >
            Low Fat
          </button>

          <button
            onClick={handleClickHighProtein}
            className={`bg-[#2c3441] text-[14px] rounded-[8px] py-2 px-6 text-white hover:bg-[#16a34a] active:bg-[#16a34a] ${
              clickedHighProtein ? "bg-[#16a34a]" : "bg-blue-500"
            }`}
          >
            High Protein
          </button>

          <button
            onClick={handleClickLowCarbs}
            className={`bg-[#2c3441] text-[14px] rounded-[8px] py-2 px-6 text-white hover:bg-[#16a34a] active:bg-[#16a34a] ${
              clickedLowCarbs ? "bg-[#16a34a]" : "bg-blue-500"
            }`}
          >
            Low Carbs
          </button>

          <button
            onClick={handleClickHighCarbs}
            className={`bg-[#2c3441] text-[14px] rounded-[8px] py-2 px-6 text-white hover:bg-[#16a34a] active:bg-[#16a34a] ${
              clickedHighCarbs ? "bg-[#16a34a]" : "bg-blue-500"
            }`}
          >
            High Carbs
          </button>
        </div>
      </div>
      <div className="bg-[#19212C] rounded-[8px] mt-6 mx-16 sm:max-lg:mx-8 px-4 py-4">
        <Recipe
          name="High Protein Chicken Bowl"
          description="A protein-rich meal perfect for muscle building"
          calories="450"
          protein="45"
          carbs="30"
          fat="15"
        />
      </div>
    </div>
  );
}
