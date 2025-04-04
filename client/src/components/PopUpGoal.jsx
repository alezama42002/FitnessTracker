import React, { useState } from "react";
import Select from "./Select";

export default function PopupGoal({ onClose, onSave }) {
  const [goal, setGoal] = useState("");

  const possibleGoals = [
    "Relaxed Weight Loss",
    "Normal Weight Loss",
    "Relaxed Weight Gain",
    "Normal Weight Gain",
  ];

  // Takes care of the select input changes
  const handleSelectChange = (event) => {
    setGoal(event.target.value);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className=" p-6 px-8 rounded-lg w-80 bg-[#2C3441]">
        <Select
          labelName="Fitness Goal"
          sendData={handleSelectChange}
          options={possibleGoals}
          selectClass="w-full appearance-none bg-[#19212C] text-white text-sm rounded-md pl-3 pr-10 py-2 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#1B9E4B] focus:border-[#1B9E4B] hover:border-[#1B9E4B] shadow-sm focus:shadow-md cursor-pointer"
        ></Select>
        <div className="mt-4 flex justify-between">
          <button
            onClick={onClose}
            className="bg-[#19212C] text-white py-1 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="bg-green-500 text-white py-1 px-4 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
