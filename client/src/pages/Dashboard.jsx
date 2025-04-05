import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import DailyOverview from "../components/Progress/DailyOverview/DailyOverview";
import DailyFoods from "../components/Progress/DailyFoods/DailyFoods";
import MicroNutrients from "../components/Progress/Micronutrients/MicroNutrients";
import WeightGraph from "../components/Progress/WeightChart/WeightChart";
import axios from "axios";
import LogWeight from "../components/Progress/LogWeight/LogWeight";

export default function Dashboard() {
  const [dailyOverviewData, setDailyOverviewData] = useState([]);
  const [micronutrientsData, setMicronutrientsData] = useState([]);
  const [weightGraphData, setWeightGraphData] = useState([]);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);

  // Gets the current weeks dates for displayment in the weight graph
  const getCurrentWeekDates = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek + 1);

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      const month = String(date.getMonth() + 1).padStart(2, "");
      const day = String(date.getDate()).padStart(2, "0");
      return `${month}/${day}`;
    });
  };

  const weekDays = getCurrentWeekDates();

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");

    if (storedToken) {
      const base64Url = storedToken.split(".")[1];
      const decodedData = JSON.parse(atob(base64Url));
      setToken(storedToken);
      setUsername(decodedData.name);
    }
  }, []);

  useEffect(() => {
    if (!username || !token) return;

    // Combination of api calls to get needed information from backend
    // for displayment on the dashboard
    const fetchAllData = async () => {
      try {
        const [macroResponse, nutritionResponse, weightResponse] =
          await Promise.all([
            axios.post(
              "http://localhost:3000/api/user/UserMacros",
              {
                Username: username,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            ),
            axios.post(
              "http://localhost:3000/api/user/GetCurrentNutrition",
              {
                Username: username,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            ),
            axios.post(
              "http://localhost:3000/api/user/GetWeights",
              {
                Username: username,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            ),
          ]);

        // Sets the data for the Daily Overview section of the dashboard
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

        // Sets the data for the Micronutrients section of the dashboard
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

        // Sets the data for the Weight section of the dashboard
        setWeightGraphData(weightResponse.data);
      } catch (error) {
        console.log(error);
        alert("An unexpected error occurred. Please try again.");

        // Prevents stale data from being displayed if an API call fails
        setDailyOverviewData([]);
        setMicronutrientsData([]);
        setWeightGraphData([]);
      }
    };
    fetchAllData();
  }, [username, token]);

  return (
    <div className="h-screen bg-[#0E131F] ">
      <div className="bg-[#0E131F] pb-10">
        <Navbar />
        <div className="dashboardContainer grid grid-cols-3 gap-y-8 gap-x-8 h-full">
          <div className="mx-10 col-span-2">
            <DailyOverview amountsData={dailyOverviewData} />
            <DailyFoods Username={username} token={token} />
          </div>

          <div className="row-span-2 mr-10 mt-8 sm:max-lg:mx-10 sm:max-lg:mt-0 lg:mx-10 lg:mt-0">
            <LogWeight Username={username} token={token} />
            <MicroNutrients nutritionData={micronutrientsData} />
          </div>
          <div className="bg-[#19212C] h-150 mx-10 rounded-[16px] col-span-2 w-auto">
            <WeightGraph weightData={weightGraphData} weekDays={weekDays} />
          </div>
        </div>
      </div>
    </div>
  );
}
