import React from "react";
import Input from "../../Input";
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
      const apiUrl = import.meta.env.VITE_API_URL;

      await axios.post(
        `${apiUrl}/user/LogWeight`,
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
      setFormData({ Weight: "" });
    } catch (error) {
      if (error.response) {
        if (error.response.status === 422) {
          const errorMessage =
            error.response.data.errors?.msg || "Invalid input.";
          alert(errorMessage);
        } else if (error.response.status === 500) {
          alert("Something went wrong on the server. Please try again later.");
        } else {
          console.log(error);
          alert(
            `Unexpected error: ${
              error.response.data?.error || "Please try again."
            }`
          );
        }
      } else {
        console.error("Network or other error:", error);
        alert("Network error. Please check your connection.");
      }
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div className="bg-[#19212C] rounded-[16px] mb-8 px-6 pb-6 sm:max-[1025px]:hidden">
      <div className=" text-white py-6">
        <h1 className=" font-semibold">Log Weight</h1>
      </div>
      <div>
        <Input
          inputName="Today's Weight (kg)"
          field="Weight"
          value={formData.Weight}
          sendData={handleInputChange}
        />
      </div>
      <div className="flex justify-center pt-2">
        <button
          type="button"
          className="bg-[#1B9E4B] rounded-[8px] px-14 py-2 mt-2 text-white font-normal text-[16px] cursor-pointer "
          onClick={handleClick}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
