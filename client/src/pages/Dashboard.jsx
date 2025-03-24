import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import DailyOverview from "../components/DailyOverview";
import DailyFoods from "../components/DailyFoods";
import MicroNutrients from "../components/MicroNutrients";
import WeightGraph from "../components/LineChart";
import axios from "axios";
import LogWeight from "../components/LogWeight";

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

  const weightData = [180, 179.5, 179, 179.2, 178.8, 178.5, 178.2];

  const getCurrentWeekDates = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek + 1); // Start from Monday

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      const month = String(date.getMonth() + 1).padStart(2, ""); // Ensure two-digit month
      const day = String(date.getDate()).padStart(2, "0"); // Ensure two-digit day
      return `${month}/${day}`;
    });
  };

  const weekDays = getCurrentWeekDates();

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
      } catch {
        /* empty */
      }
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
            <LogWeight />
            <MicroNutrients nutritionData={micronutrientsData} />
          </div>
          <div className="bg-[#19212C] h-150 ml-10 rounded-[16px] col-span-2 w-200">
            <WeightGraph weightData={weightData} weekDays={weekDays} />
          </div>
        </div>
      </div>
    </div>
  );
}
