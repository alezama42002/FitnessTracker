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
        const apiURL = import.meta.env.VITE_API_URL;

        const [macroResponse, nutritionResponse, weightResponse] =
          await Promise.all([
            axios.post(
              `${apiURL}/user/UserMacros`,
              { Username: username },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            ),
            axios
              .post(
                `${apiURL}/user/GetCurrentNutrition`,
                { Username: username },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .catch((error) => {
                if (error.response && error.response.status === 404) {
                  console.log("No nutrition data found");
                  return { data: {} };
                }
                throw error;
              }),
            axios
              .post(
                `${apiURL}/user/GetWeights`,
                { Username: username },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .catch((error) => {
                if (error.response && error.response.status === 404) {
                  console.log("No weight data found");
                  return { data: [] };
                }
                throw error;
              }),
          ]);

        // Sets the data for the Daily Overview section of the dashboard
        setDailyOverviewData([
          macroResponse.data.Calories,
          macroResponse.data.Protein,
          macroResponse.data.Carbohydrates,
          macroResponse.data.Fat,
          nutritionResponse.data.currentCalories || 0,
          nutritionResponse.data.currentProtein || 0,
          nutritionResponse.data.currentCarbohydrates || 0,
          nutritionResponse.data.currentFats || 0,
        ]);

        // Sets the data for the Micronutrients section of the dashboard
        setMicronutrientsData([
          nutritionResponse.data.currentFiber || 0,
          nutritionResponse.data.currentVitaminA || 0,
          nutritionResponse.data.currentVitaminB6 || 0,
          nutritionResponse.data.currentVitaminB12 || 0,
          nutritionResponse.data.currentVitaminC || 0,
          nutritionResponse.data.currentVitaminD || 0,
          nutritionResponse.data.currentVitaminE || 0,
          nutritionResponse.data.currentVitaminK || 0,
          nutritionResponse.data.currentCalcium || 0,
          nutritionResponse.data.currentIron || 0,
          nutritionResponse.data.currentPotassium || 0,
          nutritionResponse.data.currentMagnesium || 0,
          nutritionResponse.data.currentSodium || 0,
          nutritionResponse.data.currentZinc || 0,
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
        <div className="dashboardContainer grid grid-cols-3 gap-y-8 h-full">
          <div className="mx-10 col-span-2 lg:mr-4">
            <DailyOverview amountsData={dailyOverviewData} />
            <DailyFoods Username={username} token={token} />
          </div>

          <div className="db-second-col row-span-2 mr-10 mt-10 sm:max-lg:mx-10 sm:max-lg:mt-0 lg:mx-10">
            <LogWeight Username={username} token={token} />
            <MicroNutrients nutritionData={micronutrientsData} />
          </div>
          <div className="bg-[#19212C] h-150 mx-10 rounded-[16px] col-span-2 w-auto lg:mr-4">
            <WeightGraph weekWeightData={weightGraphData} />
          </div>
        </div>
      </div>
    </div>
  );
}
