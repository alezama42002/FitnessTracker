import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import DailyOverview from "../components/DailyOverview";
import DailyFoods from "../components/DailyFoods";
import MicroNutrients from "../components/MicroNutrients";
import WeightGraph from "../components/LineChart";
import axios from "axios";

export default function Dashboard() {
  const [dailyOverviewData, setDailyOverviewData] = useState([]);
  const [micronutrientsData, setMicronutrientsData] = useState([]);
  const [weightGraphData, setWeightGraphData] = useState([]);
  let Username;

  const token = localStorage.getItem("accessToken");
  if (token) {
    const base64Url = token.split(".")[1];
    const decodedData = JSON.parse(atob(base64Url));
    Username = decodedData.name;
  }

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [macroResponse, nutritionResponse] = await Promise.all([
          axios.post("http://localhost:3000/api/user/Macros", {
            Username: Username,
            Goal: "Relaxed Weight Loss",
          }),
          axios.post(
            "http://localhost:3000/api/user/GetCurrentNutrition",
            {
              Username: Username,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),
        ]);

        setDailyOverviewData([
          macroResponse.data.Calories,
          macroResponse.data.Protein,
          macroResponse.data.Carbohydrates,
          macroResponse.data.Fat,
          nutritionResponse.data.currentCalories,
          nutritionResponse.data.currentProtein,
          nutritionResponse.data.currentCarbohydrates,
          nutritionResponse.data.currentFats,
        ]);
        setMicronutrientsData([
          nutritionResponse.data.currentFiber,
          nutritionResponse.data.currentVitaminA,
          nutritionResponse.data.currentVitaminB6,
          nutritionResponse.data.currentVitaminB12,
          nutritionResponse.data.currentVitaminC,
          nutritionResponse.data.currentVitaminD,
          nutritionResponse.data.currentVitaminE,
          nutritionResponse.data.currentVitaminK,
          nutritionResponse.data.currentCalcium,
          nutritionResponse.data.currentIron,
          nutritionResponse.data.currentPotassium,
          nutritionResponse.data.currentMagnesium,
          nutritionResponse.data.currentSodium,
          nutritionResponse.data.currentZinc,
        ]);
      } catch {}
    };
    fetchAllData();
  }, [Username, token]);

  return (
    <div className="h-screen bg-[#0E131F]">
      <div className="bg-[#0E131F]">
        <Navbar />
        <div className="grid grid-cols-3 gap-y-8 gap-x-8 h-full">
          <div className="mx-10 w-200 col-span-2">
            <DailyOverview amountsData={dailyOverviewData} />
            <DailyFoods Username={Username} token={token} />
          </div>

          <div className="row-span-2 mt-8">
            <MicroNutrients nutritionData={micronutrientsData} />
          </div>
          <div className="bg-[#19212C] h-150 ml-10 rounded-[16px] col-span-2">
            <WeightGraph />
          </div>
        </div>
      </div>
    </div>
  );
}
