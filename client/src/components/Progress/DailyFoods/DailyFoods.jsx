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

  return (
    <div className="bg-[#19212C] mt-8 py-6 rounded-[16px]">
      <div className="flex justify-between px-6 text-white">
        <h1 className="inline font-semibold">Today's Food</h1>
      </div>
      <div className="px-6 mt-8 text-[14px]">
        <div className="dailyFoodItem-Container text-white flex justify-between sm:max-lg:justify-between border-b-2 border-b-[#363B3D] pb-3 font-semibold w-full">
          <p>Food</p>
          <div className="flex gap-14 pr-20 sm:max-lg:gap-8 sm:max-lg:pr-15">
            <p>Time</p>
            <p>Calories</p>
            <p className="sm:max-lg:hidden">Protein</p>
            <p className="sm:max-lg:hidden">Carbs</p>
            <p className="sm:max-lg:hidden">Fat</p>
          </div>
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
            />
          ))}
        </div>
        <div className="dailyFoodItem-Container text-white flex justify-between sm:max-lg:justify-between border-b-2 border-b-[#363B3D] pb-3 font-semibold w-full mt-6">
          <p>Recipe</p>
          <div className="flex gap-14 pr-20 sm:max-lg:gap-8 sm:max-lg:pr-15">
            <p>Time</p>
            <p>Calories</p>
            <p className="sm:max-lg:hidden">Protein</p>
            <p className="sm:max-lg:hidden">Carbs</p>
            <p className="sm:max-lg:hidden">Fat</p>
          </div>
        </div>
        <div>
          {dailyRecipesData.map((food, index) => (
            <Food
              key={index}
              name={food.recipeName}
              logTime={food.logTime || "Unknown"}
              calories={food.Calories}
              protein={food.Protein}
              carbs={food.Carbs}
              fat={food.Fat}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
