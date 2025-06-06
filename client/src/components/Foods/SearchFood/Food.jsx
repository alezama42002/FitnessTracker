import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import PopupQuantity from "../../PopupQuantity";
import { FaPlus } from "react-icons/fa";

export default function Food({ food }) {
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

      const match = foodData.macros.match(/Per (.+?)\s*-/);
      const measurement = match ? match[1] : null;

      const macros = foodData.macros
        .match(/\d+(\.\d+)?/g)
        .map((num) => Math.round(parseFloat(num)));

      const apiUrl = import.meta.env.VITE_API_URL;

      await axios.post(
        `${apiUrl}/user/LogFood`,
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
          servingDescription: measurement,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setQuantities((prev) => ({ ...prev, [foodData.ID]: "" }));
    } catch (error) {
      if (error.response) {
        if (error.response.status === 500) {
          alert("Something went wrong on the server. Please try again later.");
        } else {
          console.log(error);
          alert(`Error: ${error.response.data?.error || "Unexpected error."}`);
        }
      } else {
        console.error("Network or other error:", error);
        alert("Network error. Please check your connection.");
      }
    }
  };

  const handleQuantity = (food) => {
    setSelectedFood(food);
    setOpen(true);
  };

  return (
    <>
      <div key={food.ID} className="text-white flex justify-between pb-1 pt-3">
        <div className="sm:w-65 md:w-80 lg:w-100 ">
          <p>
            {food.name} {food.brand && `(${food.brand})`}
          </p>{" "}
        </div>
        <div className="flex gap-2 items-center justify-center pr-2 relative">
          <FaPlus
            size={20}
            onClick={() => handleQuantity(food)}
            className="bg-[#1b9e4b] w-fit py-0.75 px-4 rounded"
          />
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
      </div>
      <div>
        <p className="border-b-2 pb-3 border-b-[#363B3D]">{food.macros}</p>{" "}
      </div>
    </>
  );
}
