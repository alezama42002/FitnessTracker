import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";

export default function PopupGoal({ onClose, onSave }) {
  const [goal, setGoal] = useState("");

  const possibleGoals = [
    { value: "relaxed_weight_loss", label: "Relaxed Weight Loss" },
    { value: "normal_weight_loss", label: "Normal Weight Loss" },
    { value: "relaxed_weight_gain", label: "Relaxed Weight Gain" },
    { value: "normal_weight_gain", label: "Normal Weight Gain" },
  ];

  // Takes care of the select input changes
  const handleSelectChange = (event) => {
    setGoal(event.label);
  };

  const setMacros = async () => {
    const Username = localStorage.getItem("Username");
    const token = localStorage.getItem("accessToken");
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const macros = await axios.post(`${apiUrl}/user/Macros`, {
        Username: Username,
        Goal: goal,
      });

      await axios.patch(
        `${apiUrl}/user/SetMacros`,
        {
          Macros: macros.data,
          Username: Username,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onSave(goal);
    } catch (error) {
      if (error.response) {
        // Server-side errors
        if (error.response.status === 500) {
          console.error("Error on the server. Please try again later.");
        } else {
          console.error(
            `Error: ${error.response.data?.error || "Unexpected error."}`
          );
        }
      } else {
        // Network or other errors
        console.error("Network error or unexpected issue:", error);
      }
    }
  };

  return (
    <div className="absolute top-12 -right-2.5 flex justify-center ">
      <div className="p-6 px-8 rounded-lg w-80 bg-[#2C3441]">
        <Select
          options={possibleGoals}
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: "#42505F",
              border: "none",
              boxShadow: "none",
            }),
            singleValue: (base) => ({
              ...base,
              color: "white",
            }),
            option: (base, state) => ({
              ...base,
              color: "white",
              backgroundColor: state.isSelected ? "#1B9E4B" : "#42505F",
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: "#42505F", // Change this to control the background of the menu area
            }),
            menuList: (base) => ({
              ...base,
              backgroundColor: "#42505F",
              borderRadius: "8px",
            }),
          }}
          onChange={handleSelectChange}
        />
        <div className="mt-4 flex justify-between">
          <button
            onClick={onClose}
            className="bg-[#19212C] text-white py-1 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={setMacros}
            className="bg-green-500 text-white py-1 px-4 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
