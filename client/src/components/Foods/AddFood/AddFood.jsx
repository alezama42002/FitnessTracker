import React from "react";
import Input from "../../Input";
import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import axios from "axios";

export default function AddFood() {
  const [formData, setFormData] = useState({
    foodBrand: "",
    Description: "",
    foodName: "",
    servingSize: "",
    Calories: "",
    Protein: "",
    Carbohydrates: "",
    Fats: "",
    Fiber: "0",
    VitaminA: "0",
    VitaminB6: "0",
    VitaminB12: "0",
    VitaminC: "0",
    VitaminD: "0",
    VitaminE: "0",
    VitaminK: "0",
    Calcium: "0",
    Iron: "0",
    Potassium: "0",
    Magnesium: "0",
    Sodium: "0",
    Zinc: "0",
  });

  const [dropToggle, setDropToggle] = useState(true);

  const toggleDrop = () => {
    setDropToggle(!dropToggle);
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const addFood = async () => {
    const token = localStorage.getItem("accessToken");

    try {
      await axios.post("http://localhost:3000/api/food/AddFood", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
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
            field="foodName"
            sendData={handleInputChange}
          />
        </div>
        <div className="flex-1">
          <Input
            inputName="Food Brand"
            field="foodBrand"
            sendData={handleInputChange}
          />
        </div>
        <div className="flex-1">
          <Input
            inputName="Serving Size"
            field="servingSize"
            sendData={handleInputChange}
          />
        </div>
      </div>
      <div className="flex-1 mt-6">
        <Input
          inputName="Food Description"
          field="Description"
          sendData={handleInputChange}
        />
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
              field="Protein"
              sendData={handleInputChange}
            />
          </div>
          <div className="flex-1">
            <Input
              inputName="Carbs (g)"
              field="Carbohydrates"
              sendData={handleInputChange}
            />
          </div>
          <div className="flex-1">
            <Input
              inputName="Fats (g)"
              field="Fats"
              sendData={handleInputChange}
            />
          </div>
        </div>
        <div className="pt-6 pb-6">
          <div className="flex flex-col gap-4 pb-4">
            <div className="flex  items-center gap-2">
              <h1 className=" text-[#55E088] font-semibold text-center">
                Micronutrients
              </h1>
              <p className="text-red-50">(optional)</p>
              <IoIosArrowUp
                onClick={toggleDrop}
                size={22}
                className={`micronutrientsArrow ${
                  dropToggle ? "rotate" : ""
                } rotate-180 mt-1 cursor-pointer`}
              />
            </div>
            <div
              className={`micronutientsContainer ${
                dropToggle ? "hide" : ""
              } flex sm:max-lg:flex-col justify-center w-full gap-6`}
            >
              <div className="flex-1">
                <Input
                  inputName="Fiber (g)"
                  field="Fiber"
                  sendData={handleInputChange}
                />
              </div>
              <div className="flex-1">
                <Input
                  inputName="Vitamin A"
                  field="VitaminA"
                  sendData={handleInputChange}
                />
              </div>
              <div className="flex-1">
                <Input
                  inputName="Vitamin B6"
                  field="VitaminB6"
                  sendData={handleInputChange}
                />
              </div>
              <div className="flex-1">
                <Input
                  inputName="Vitamin B12"
                  field="VitaminB12"
                  sendData={handleInputChange}
                />
              </div>
              <div className="flex-1">
                <Input
                  inputName="Vitamin C"
                  field="VitaminC"
                  sendData={handleInputChange}
                />
              </div>
              <div className="flex-1">
                <Input
                  inputName="Vitamin D"
                  field="VitaminD"
                  sendData={handleInputChange}
                />
              </div>
              <div className="flex-1">
                <Input
                  inputName="Vitamin E"
                  field="VitaminE"
                  sendData={handleInputChange}
                />
              </div>
            </div>
            <div
              className={`micronutientsContainer ${
                dropToggle ? "hide" : ""
              } flex sm:max-lg:flex-col justify-center w-full gap-6`}
            >
              <div className="flex-1">
                <Input
                  inputName="Vitamin K"
                  field="VitaminK"
                  sendData={handleInputChange}
                />
              </div>
              <div className="flex-1">
                <Input
                  inputName="Calcium"
                  field="Calcium"
                  sendData={handleInputChange}
                />
              </div>
              <div className="flex-1">
                <Input
                  inputName="Iron"
                  field="Iron"
                  sendData={handleInputChange}
                />
              </div>
              <div className="flex-1">
                <Input
                  inputName="Potassium"
                  field="Potassium"
                  sendData={handleInputChange}
                />
              </div>
              <div className="flex-1">
                <Input
                  inputName="Magnesium"
                  field="Magnesium"
                  sendData={handleInputChange}
                />
              </div>
              <div className="flex-1">
                <Input
                  inputName="Sodium"
                  field="Sodium"
                  sendData={handleInputChange}
                />
              </div>
              <div className="flex-1">
                <Input
                  inputName="Zinc"
                  field="Zinc"
                  sendData={handleInputChange}
                />
              </div>
            </div>
          </div>
          <button
            type="button"
            className="bg-[#1B9E4B] rounded-[8px] w-full py-2 px-14 mt-2 text-white font-normal text-[18px] cursor-pointer "
            onClick={addFood}
          >
            Add Food
          </button>
        </div>
      </div>
    </div>
  );
}
