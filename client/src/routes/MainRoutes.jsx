import { Routes, Route } from "react-router-dom";
import ProtectedLayout from "./ProtectedRoutes";
import Dashboard from "../pages/Dashboard";
import FoodLog from "../pages/FoodLog";
import Recipes from "../pages/Recipes";
import Suggestions from "../pages/Suggestions";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/Progress" element={<Dashboard />} />
      <Route path="/FoodLog" element={<FoodLog />} />
      <Route path="/Recipes" element={<Recipes />} />
      <Route path="/Suggestions" element={<Suggestions />} />
    </Routes>
  );
};

export default MainRoutes;
