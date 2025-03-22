import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import DailyOverview from "../components/DailyOverview";
import DailyFoods from "../components/DailyFoods";
import MicroNutrients from "../components/MicroNutrients";
import WeightGraph from "../components/LineChart";
import axios from 'axios';

export default function Dashboard() {
  const [dailyOverviewData, setDailyOverviewData] = useState([]);
  const [dailyFoodsData, setDailyFoodsData] = useState([]);
  const [micronutrientsData, setMicronutrientsData] = useState([]);
  const [weightGraphData, setWeightGraphData] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [dailyOverviewData, dailyFoodsData, micronutrientsData] = await Promise.all([
          await axios.get('http://localhost:3000/api/user/Macros'),
          await axios.
        ])
      }
    }
  })

  return (
    <div className="h-screen bg-[#0E131F]">
      <div className="bg-[#0E131F]">
        <Navbar />
        <div className="grid grid-cols-3 gap-y-8 gap-x-8 h-full">
          <div className="mx-10 w-200 col-span-2">
            <DailyOverview />
            <DailyFoods />
          </div>

          <div className="row-span-2 mt-8">
            <MicroNutrients />
          </div>
          <div className="bg-[#19212C] h-150 ml-10 rounded-[16px] col-span-2">
            <WeightGraph />
          </div>
        </div>
      </div>
    </div>
  );
}
