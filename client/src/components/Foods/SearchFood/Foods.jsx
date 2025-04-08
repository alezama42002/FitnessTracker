import React from "react";
import Food from "./Food";

export default function Foods({ searchedFoodData }) {
  return (
    <div className="w-full">
      {searchedFoodData.length > 0
        ? searchedFoodData.map((food) => <Food key={food.ID} food={food} />)
        : null}
    </div>
  );
}
