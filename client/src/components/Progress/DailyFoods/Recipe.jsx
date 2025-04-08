import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import axios from "axios";
import PopupQuantity from "../../PopupQuantity";
import { useState } from "react";

export default function Recipe({ recipeData }) {
  const [open, setOpen] = useState(false);
  const deleteLog = async () => {
    const Username = localStorage.getItem("Username");
    const token = localStorage.getItem("accessToken");
    if (!Username || !token) return;

    try {
      await axios.delete("http://localhost:3000/api/user/DeleteRecipeLog", {
        data: {
          recipeName: recipeData.Name,
          Calories: recipeData.Calories,
          Username: Username,
          Servings: recipeData.Servings,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const editLog = async (newQuantity) => {
    setOpen(true);
    const Username = localStorage.getItem("Username");
    const token = localStorage.getItem("accessToken");
    if (!Username || !token) return;

    try {
      await axios.patch(
        "http://localhost:3000/api/user/EditRecipeLog",
        {
          recipeName: recipeData.Name,
          Calories: recipeData.Calories,
          Username: Username,
          Servings: recipeData.Servings,
          newServings: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_36px] sm:max-md:grid-cols-[1fr_1fr_1fr_36px] text-white border-b-2 border-b-[#363B3D] py-3 items-center">
      <p>{recipeData.Name}</p>
      <p className="justify-self-center sm:max-md:hidden">{recipeData.logTime}</p>
      <p className="justify-self-center">{recipeData.Servings}</p>
      <p className="justify-self-center">{recipeData.Calories} kcal</p>
      <p className="justify-self-center sm:max-md:hidden">
        {recipeData.Protein}g
      </p>
      <p className="justify-self-center sm:max-md:hidden">
        {recipeData.Carbs}g
      </p>
      <p className="justify-self-center sm:max-md:hidden">{recipeData.Fat}g</p>
      <div className="flex gap-2">
        <FaRegTrashCan onClick={deleteLog} className="cursor-pointer" />
        <GoPencil onClick={editLog} className="cursor-pointer" />
        {open && (
          <PopupQuantity
            text={"Enter New Quantity"}
            onClose={() => setOpen(false)}
            onSave={(quantity) => {
              editLog(quantity);
              setOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
