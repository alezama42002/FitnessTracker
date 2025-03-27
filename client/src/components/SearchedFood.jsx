import React from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { useState, useEffect } from "react";

export default function SearchedFood({ searchedFoodData }) {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");

    if (storedToken) {
      const base64Url = storedToken.split(".")[1];
      const decodedData = JSON.parse(atob(base64Url));
      setToken(storedToken);
      setUsername(decodedData.name);
    }
  }, []);

  const logFood = async (foodData, quantity) => {
    try {
      if (!quantity || quantity <= 0) {
        alert("Please enter a valid quantity.");
        return;
      }

      const macros = foodData.macros
        .match(/\d+(\.\d+)?/g)
        .map((num) => Math.round(parseFloat(num)));

      await axios.post(
        "http://localhost:3000/api/user/LogFood",
        {
          foodID: foodData.ID,
          foodName: foodData.name,
          foodBrand: foodData.brand,
          Calories: macros[1],
          Protein: macros[4],
          Carbohydrates: macros[3],
          Fats: macros[2],
          Username: username,
          Quantity: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setQuantities((prev) => ({ ...prev, [foodData.ID]: "" }));
    } catch (error) {
      console.log(error);
    }
  };

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
                <FaPlus onClick={() => logFood(food, quantities[food.ID])} />
              </div>
            </div>
          ))
        : null}
    </div>
  );
}
