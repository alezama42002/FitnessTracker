import React from "react";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import { useState } from "react";

export default function Recipes() {
  const [formData, setFormData] = useState({
    Username: "",
    Password: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div className="h-screen bg-[#0E131F]">
      <Navbar />
      <div className="mx-16">
        <h1 className="text-[22px] text-white pt-4">Create Recipe </h1>
        <div className="bg-[#19212C] text-white mt-6 p-6 rounded-[8px]">
          <div>
            <Input
              inputName="Recipe Name"
              field="recipeName"
              sendData={handleInputChange}
            />
            <div class="inline-flex items-center gap-2 pt-4 pb-6">
              <div class="relative inline-block w-11 h-5 ">
                <input
                  id="switch-component-on"
                  type="checkbox"
                  class="peer appearance-none w-11 h-5 bg-[#0E131F] rounded-full checked:bg-[#1B9E4B] cursor-pointer transition-colors duration-300"
                />
                <label
                  for="switch-component-on"
                  class="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer"
                ></label>
              </div>

              <label
                for="switch-component-on"
                class="text-[#AFA99E] text-sm cursor-pointer"
              >
                Public Recipe
              </label>
            </div>
            <div className="pb-6">
              <Input
                inputName="Search Ingredient"
                field="searchIngredient"
                sendData={handleInputChange}
              />
            </div>
            <div>
              <h2 className="pb-4 text-[18px]">Nutrition Information</h2>
              <div className="flex gap-4 pb-2">
                <div className="flex-1">
                  <Input
                    inputName="Calories (kcal)"
                    field="calories"
                    sendData={handleInputChange}
                  />
                </div>
                <div className="flex-1">
                  <Input
                    inputName="Protein (g)"
                    field="protein"
                    sendData={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    inputName="Carbs (g)"
                    field="carbs"
                    sendData={handleInputChange}
                  />
                </div>
                <div className="flex-1">
                  <Input
                    inputName="Fat (g)"
                    field="fat"
                    sendData={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="bg-[#1B9E4B] rounded-[8px] px-14 mt-4 mb-2 text-white font-normal text-[18px] cursor-pointer w-full py-2"
          >
            Add Recipe
          </button>
        </div>
      </div>
    </div>
  );
}
