import React from "react";
import Input from "../components/Input";
import { useState } from "react";
import axios from "axios";

export default function LogWeight({ Username, token }) {
  const [formData, setFormData] = useState({
    Weight: "",
  });

  const handleClick = async () => {
    try {
      if (!Username || !token) return;

      const weightInt = parseInt(formData.Weight, 10);
      await axios.post(
        "http://localhost:3000/api/user/LogWeight",
        {
          Username: Username,
          Weight: weightInt,
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
          field="Weight"
          sendData={handleInputChange}
        />
      </div>
      <div className="flex justify-center pt-2">
        <button
          type="button"
          className="bg-[#1B9E4B] rounded-[8px] px-14 mt-2 text-white font-normal text-[18px] cursor-pointer  py-2"
          onClick={handleClick}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
