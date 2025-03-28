import React from "react";
import Input from "../components/Input";
import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

export default function AddFood() {
  const [formData, setFormData] = useState({
    Username: "",
    Password: "",
    ReEnteredPassword: "",
  });

  const [dropToggle, setDropToggle] = useState(false);

  const toggleDrop = () => {
    setDropToggle(!dropToggle);
    console.log(dropToggle)
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div className="addFoodContainer bg-[#19212C] p-6 rounded-[16px]">
      <div className=" flex flex-col gap-4 pb-6">
        <h1 className=" text-white">Add Custom Food</h1>
        <p className="text-[#8FA99E]">
          Create a custom food with detailed nutritional information
        </p>
      </div>
      <div className="flex justify-center w-full gap-6 sm:max-lg:flex-col">
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
        <div className="flex justify-center w-full gap-6 sm:max-lg:flex-col">
          <div className="flex-1">
            <Input
              inputName="Calories (kcal)"
              field="Calories"
              sendData={handleInputChange}
            />
          </div>
          <div className="flex-1">
            <Input
              inputName="Protein (g)"
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
          <div className="flex items-center gap-4 pb-4">
            <h1 className=" text-[#55E088] font-semibold text-center">
              Micronutrients
            </h1>
            <IoIosArrowUp onClick={toggleDrop} size={22} className={`micronutrientsArrow ${
              dropToggle ? "rotate" : ""
            } rotate-180 cursor-pointer`} />
          </div>
          <div
            className={`micronutientsContainer ${
              dropToggle ? "hide" : ""
            } flex justify-center w-full gap-6`}
          >
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
          className="bg-[#1B9E4B] rounded-[8px] w-full py-2 px-14 mt-2 text-white font-normal text-[18px] cursor-pointer "
        >
          Add Food
        </button>
      </div>
    </div>
  );
}
