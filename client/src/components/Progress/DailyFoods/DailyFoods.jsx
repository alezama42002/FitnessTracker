import React from "react";
import Food from "./Food";
import Recipe from "./Recipe";
import { useState, useEffect } from "react";
import axios from "axios";

export default function DailyFoods({ Username, token }) {
  const [dailyFoodsData, setDailyFoodsData] = useState([]);
  const [dailyRecipesData, setDailyRecipesData] = useState([]);

  useEffect(() => {
    const fetchUserFoods = async () => {
      if (!Username || !token) return;
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const [foodresponse, reciperesponse] = await Promise.all([
          axios
            .post(
              `${apiUrl}/user/GetUserFoods`,
              { Username: Username },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .catch((error) => {
              if (error.response && error.response.status === 404) {
                console.log("No food data found");
                return { data: [] };
              }
              throw error;
            }),

          axios
            .post(
              `${apiUrl}/user/GetUserRecipes`,
              { Username: Username },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .catch((error) => {
              if (error.response && error.response.status === 404) {
                console.log("No recipe data found");
                return { data: [] };
              }
              throw error;
            }),
        ]);

        setDailyFoodsData(foodresponse.data);
        setDailyRecipesData(reciperesponse.data);
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    };
    fetchUserFoods();
  }, [Username, token]);

  return (
    <div className="bg-[#19212C] mt-7 py-6 rounded-[16px]">
      <div className="flex justify-between px-6 text-white">
        <h1 className="inline font-semibold">Today's Food</h1>
      </div>
      <div className="px-6 mt-3 text-[14px]">
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_36px] text-white font-semibold border-b-2 border-b-[#363B3D] pb-3 pt-4 w-full sm:max-md:grid-cols-[1fr_1fr_1fr_36px]">
          <p>Food</p>
          <p className="justify-self-center sm:max-md:hidden">Time</p>
          <p className="justify-self-center">Servings</p>
          <p className="justify-self-center">Calories</p>
          <p className="justify-self-center sm:max-md:hidden">Protein</p>
          <p className="justify-self-center sm:max-md:hidden">Carbs</p>
          <p className="justify-self-center sm:max-md:hidden">Fat</p>
        </div>
        <div>
          {dailyFoodsData.map((food, index) => (
            <Food key={index} foodData={food} />
          ))}
        </div>
        <div className="bg-[#ffffffab] mb-4 mt-7 h-1 rounded-[16px]"></div>
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_36px] sm:max-md:grid-cols-[1fr_1fr_1fr_36px] text-white font-semibold border-b-2 border-b-[#363B3D] pb-3 pt-4 w-full">
          <p>Recipe</p>
          <p className="justify-self-center sm:max-md:hidden">Time</p>
          <p className="justify-self-center">Servings</p>
          <p className="justify-self-center">Calories</p>
          <p className="justify-self-center sm:max-md:hidden">Protein</p>
          <p className="justify-self-center sm:max-md:hidden">Carbs</p>
          <p className="justify-self-center sm:max-md:hidden">Fat</p>
        </div>
        {
          <div>
            {dailyRecipesData.map((recipe, index) => (
              <Recipe key={index} recipeData={recipe} />
            ))}
          </div>
        }
      </div>
    </div>
  );
}
