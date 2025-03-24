import React from "react";
import Input from "../components/Input";
import { useState } from "react";

export default function LogWeight() {
  const [formData, setFormData] = useState({
    Username: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  return (
    <div className="bg-[#19212C] rounded-[16px] mb-8 mr-[40px] px-6 pb-6 ">
      <div className=" text-white py-6">
        <h1 className=" font-semibold">Log Weight</h1>
      </div>
      <div>
        <Input
          inputName="Today's Weight"
          field="FoodName"
          sendData={handleInputChange}
        />
      </div>
      <div className="flex justify-center pt-2">
        <button
          type="button"
          className="bg-[#1B9E4B] rounded-[8px] px-14 mt-2 text-white font-normal text-[18px] cursor-pointer  py-2"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
