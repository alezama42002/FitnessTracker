import React from "react";
import Navbar from "../components/Navbar";
import DailyOverview from "../components/DailyOverview";
import DailyFoods from "../components/DailyFoods";

export default function Dashboard() {
  return (
    <div className="h-screen bg-[#0E131F] ">
      <Navbar />
      <div className="mx-10 w-200">
        <DailyOverview />
        <DailyFoods />
      </div>
    </div>
  );
}
