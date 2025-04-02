import React from "react";
import Food from "./Food";
import { useState, useEffect } from "react";
import axios from "axios";

export default function DailyFoods({ Username, token }) {
  const [dailyFoodsData, setDailyFoodsData] = useState([]);

  useEffect(() => {
    const fetchUserFoods = async () => {
      if (!Username || !token) return;
      try {
        const response = await axios.post(
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
        setDailyFoodsData(response.data);
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
          <div className="flex gap-14 pr-20 sm:max-lg:gap-12 sm:max-lg:pr-18">
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
              carbs={food.Carbohydrates}
              fat={food.Fat}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
