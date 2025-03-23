import React from "react";
import Input from "../components/Input";
import { useState } from "react";

export default function AddFood() {
  const [formData, setFormData] = useState({
    Username: "",
    Password: "",
    ReEnteredPassword: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div className="bg-[#19212C] px-6 py-6 rounded-[16px]">
      <div className=" flex flex-col gap-4 pb-6">
        <h1 className="text-white">Add Custom Food</h1>
        <p className="text-[#8FA99E]">
          Create a custom food with detailed nutritional information
        </p>
      </div>
      <div className="flex justify-center w-full gap-6">
        <div className="flex-1">
          <Input
            inputName="Food Name"
            field="FoodName"
            sendData={handleInputChange}
          />
        </div>
        <div className="flex-1">
          <Input
            inputName="Serving Size"
            field="ServingSize"
            sendData={handleInputChange}
          />
        </div>
      </div>
      <div className="pt-6">
        <h1 className="pb-4 text-[#55E088] font-semibold">Macronutrients</h1>
        <div className="flex justify-center w-full gap-6">
          <div className="flex-1">
            <Input
              inputName="Calories (kcal)"
              field="Calories"
              sendData={handleInputChange}
            />
          </div>
          <div className="flex-1">
            <Input
              inputName="Serving Size"
              field="ServingSize"
              sendData={handleInputChange}
            />
          </div>
          <div className="flex-1">
            <Input
              inputName="Food Name"
              field="FoodName"
              sendData={handleInputChange}
            />
          </div>
          <div className="flex-1">
            <Input
              inputName="Serving Size"
              field="ServingSize"
              sendData={handleInputChange}
            />
          </div>
        </div>
        <div className="pt-6 pb-6">
          <h1 className="pb-4 text-[#55E088] font-semibold">Macronutrients</h1>
          <div className="flex justify-center w-full gap-6">
            <div className="flex-1">
              <Input
                inputName="Calories (kcal)"
                field="Calories"
                sendData={handleInputChange}
              />
            </div>
            <div className="flex-1">
              <Input
                inputName="Serving Size"
                field="ServingSize"
                sendData={handleInputChange}
              />
            </div>
            <div className="flex-1">
              <Input
                inputName="Food Name"
                field="FoodName"
                sendData={handleInputChange}
              />
            </div>
            <div className="flex-1">
              <Input
                inputName="Serving Size"
                field="ServingSize"
                sendData={handleInputChange}
              />
            </div>
          </div>
          <div className="flex justify-center w-full gap-6 pt-4">
            <div className="flex-1">
              <Input
                inputName="Calories (kcal)"
                field="Calories"
                sendData={handleInputChange}
              />
            </div>
            <div className="flex-1">
              <Input
                inputName="Serving Size"
                field="ServingSize"
                sendData={handleInputChange}
              />
            </div>
            <div className="flex-1">
              <Input
                inputName="Food Name"
                field="FoodName"
                sendData={handleInputChange}
              />
            </div>
            <div className="flex-1">
              <Input
                inputName="Serving Size"
                field="ServingSize"
                sendData={handleInputChange}
              />
            </div>
          </div>
        </div>
        <button
          type="button"
          className="bg-[#1B9E4B] rounded-[8px] px-14 mt-2 text-white font-normal text-[18px] cursor-pointer w-full py-2"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
