import React, { useState } from "react";
import axios from "axios";

export default function PopUpWeight({ onClose, onSave }) {
  const [weight, setWeight] = useState("");

  const logWeight = async () => {
    const Username = localStorage.getItem("Username");
    const token = localStorage.getItem("accessToken");
    try {
      if (!Username || !token) return;

      const weightInt = parseInt(weight, 10);
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
      onSave();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className=" p-4 rounded-lg w-80 bg-[#2C3441] ">
        <div className="flex justify-center">
          <h2 className="text-xl mb-4 text-white">Log Weight</h2>
        </div>

        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="border border-[#1b9e4b] p-2 rounded w-full focus:outline-none "
          min="1"
        />
        <div className="mt-4 flex justify-between">
          <button
            onClick={onClose}
            className="bg-[#19212C] text-white py-1 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={logWeight}
            className="bg-green-500 text-white py-1 px-4 rounded"
          >
            Log
          </button>
        </div>
      </div>
    </div>
  );
}
