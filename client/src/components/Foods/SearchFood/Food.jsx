import React from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { useState, useEffect } from "react";
import PopupQuantity from "../../PopupQuantity";

export default function Food({ searchedFoodData }) {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [open, setOpen] = React.useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

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

  const handleQuantity = (food) => {
    setSelectedFood(food);
    setOpen(true);
  };

  return (
    <div className="w-full">
      {searchedFoodData.length > 0
        ? searchedFoodData.map((food) => (
            <>
              <div
                key={food.ID}
                className="text-white flex justify-between pb-1 pt-3"
              >
                <div className="sm:w-65 md:w-80 lg:w-100">
                  <p>
                    {food.name} {food.brand && `(${food.brand})`}
                  </p>{" "}
                </div>
                <div className="flex gap-2 items-center justify-center pr-2">
                  <FaPlus onClick={() => handleQuantity(food)} />
                </div>
              </div>
              <div>
                <p className="border-b-2 border-b-[#363B3D]">{food.macros}</p>{" "}
              </div>
            </>
          ))
        : null}
      {open && (
        <PopupQuantity
          text={"Enter Quantity"}
          onClose={() => setOpen(false)}
          onSave={(quantity) => {
            logFood(selectedFood, quantity);
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}
