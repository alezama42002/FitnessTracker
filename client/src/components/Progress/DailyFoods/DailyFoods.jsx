import React from "react";
import Food from "./Food";
import { useState, useEffect } from "react";
import axios from "axios";

export default function DailyFoods({ Username, token }) {
  const [dailyFoodsData, setDailyFoodsData] = useState([]);
  const [dailyRecipesData, setDailyRecipesData] = useState([]);

  useEffect(() => {
    const fetchUserFoods = async () => {
      if (!Username || !token) return;
      try {
        const foodresponse = await axios.post(
          "http://localhost:3000/api/user/GetUserFoods",
          {
            Username: Username,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const reciperesponse = await axios.post(
          "http://localhost:3000/api/user/GetUserRecipes",
          {
            Username: Username,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDailyFoodsData(foodresponse.data);
        setDailyRecipesData(reciperesponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserFoods();
  }, [Username, token]);

  const deleteFood = async (foodID, Quantity) => {
    try {
      await axios.delete("http://localhost:3000/api/user/DeleteLog", {
        data: {
          foodID: foodID,
          Username: Username,
          Quantity: Quantity,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editFood = (newQuantity) => {
    alert("Edit food");
  };

  const deleteRecipe = () => {
    alert("Delete recipe");
  };

  const editRecipe = (newQuantity) => {
    alert("Edit recipe");
  };

  return (
    <div className="bg-[#19212C] mt-8 py-6 rounded-[16px]">
      <div className="flex justify-between px-6 text-white">
        <h1 className="inline font-semibold">Today's Food</h1>
      </div>
      <div className="px-6 mt-8 text-[14px]">
        {/* <div className="text-white flex justify-between sm:max-lg:justify-between border-b-2 border-b-[#363B3D] pb-3 font-semibold w-full">
          <p>Food</p>
          <div className="flex gap-14 pr-20 sm:max-lg:gap-8 sm:max-lg:pr-15">
            <p>Time</p>
            <p>Quantity</p>
            <p>Calories</p>
            <p className="sm:max-lg:hidden">Protein</p>
            <p className="sm:max-lg:hidden">Carbs</p>
            <p className="sm:max-lg:hidden">Fat</p>
          </div>
        </div> */}
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_36px] text-white font-semibold border-b-2 border-b-[#363B3D] pb-3 pt-4 w-full sm:max-md:grid-cols-[1fr_1fr_1fr_36px]">
          <p>Food</p>
          <p className="justify-self-center">Time</p>
          <p className="justify-self-center">Calories</p>
          <p className="justify-self-center sm:max-md:hidden">Protein</p>
          <p className="justify-self-center sm:max-md:hidden">Carbs</p>
          <p className="justify-self-center sm:max-md:hidden">Fat</p>
        </div>
        <div>
          {dailyFoodsData.map((food, index) => (
            <Food
              key={index}
              name={food.foodName}
              logTime={food.logTime || "Unknown"}
              calories={food.Calories}
              protein={food.Protein}
              carbs={food.Carbs}
              fat={food.Fat}
              quantity={food.Quantity}
              editLog={editFood}
              deleteLog={deleteFood}
              foodID={food.foodID}
            />
          ))}
        </div>
        {/* <div className="dailyFoodItem-Container text-white flex justify-between sm:max-lg:justify-between border-b-2 border-b-[#363B3D] pb-3 font-semibold w-full mt-6">
          <p>Recipe</p>
          <div className="flex gap-14 pr-20 sm:max-lg:gap-8 sm:max-lg:pr-15">
            <p>Time</p>
            <p>Quantity</p>
            <p>Calories</p>
            <p className="sm:max-lg:hidden">Protein</p>
            <p className="sm:max-lg:hidden">Carbs</p>
            <p className="sm:max-lg:hidden">Fat</p>
          </div>
        </div> 
        */}
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_36px] sm:max-md:grid-cols-[1fr_1fr_1fr_36px] text-white font-semibold border-b-2 border-b-[#363B3D] pb-3 pt-4 w-full">
          <p>Recipe</p>
          <p className="justify-self-center">Time</p>
          <p className="justify-self-center">Calories</p>
          <p className="justify-self-center sm:max-md:hidden">Protein</p>
          <p className="justify-self-center sm:max-md:hidden">Carbs</p>
          <p className="justify-self-center sm:max-md:hidden">Fat</p>
        </div>
        {/* <div>
          {dailyRecipesData.map((food, index) => (
            <Food
              key={index}
              name={food.recipeName}
              logTime={food.logTime || "Unknown"}
              calories={food.Calories}
              protein={food.Protein}
              carbs={food.Carbs}
              fat={food.Fat}
              quantity={food.Servings}
              editLog={editRecipe}
              deleteLog={deleteRecipe}
              foodID={food.recipeID}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
}
