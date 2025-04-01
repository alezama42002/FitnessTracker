import React from "react";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import PopupQuantity from "./PopupQuantity";

export default function SearchedIngredient({
  searchedFoodData,
  addIngredient,
}) {
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

  const logRecipe = () => {
    alert("Recipe Logged");
  };

  return (
    <div className="lg:w-full">
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
          food={selectedFood}
          text={"Enter Quantity"}
          onClose={() => setOpen(false)}
          onSave={(quantity) => {
            logRecipe(selectedFood, quantity);
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}
