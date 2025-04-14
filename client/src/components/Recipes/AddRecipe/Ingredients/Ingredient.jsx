import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import PopupQuantity from "../../../PopupQuantity";
import { FaPlus } from "react-icons/fa";

export default function Food({ food, addIngredient }) {
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
                addIngredient(selectedFood, quantity);
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
