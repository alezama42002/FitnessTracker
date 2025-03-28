import React from "react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

export default function SearchedIngredient({
  searchedFoodData,
  addIngredient,
}) {
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (foodID, value) => {
    setQuantities((prev) => ({ ...prev, [foodID]: value }));
  };

  return (
    <div>
      {searchedFoodData.length > 0
        ? searchedFoodData.map((food) => (
            <div
              key={food.ID}
              className="text-white flex border-b-2 border-b-[#363B3D] py-3"
            >
              <div className="w-52">
                <p>{food.name}</p> {/* Display food name */}
              </div>

              <div className="flex gap-13">
                <p>{food.brand || "No Brand"}</p>{" "}
                {/* Display food brand, fallback to "No Brand" */}
                <p className="pl-6.5">
                  {food.macros || "No Macros Information"}
                </p>{" "}
                {/* Display macros, fallback to "No Macros Information" */}
              </div>
              <div className="flex gap-2 items-center justify-center pl-7">
                <input
                  type="number"
                  min="1"
                  className="w-16 px-2 py-1 border rounded bg-gray-800 text-white text-center"
                  value={quantities[food.ID] || ""}
                  onChange={(e) =>
                    handleQuantityChange(food.ID, e.target.value)
                  }
                  placeholder="Qty"
                />{" "}
                <FaPlus
                  onClick={() => addIngredient(food, quantities[food.ID])}
                />
              </div>
            </div>
          ))
        : null}
    </div>
  );
}
