import React, { useState } from "react";
import axios from "axios";

export default function PopUpWeight({ onClose, onSave }) {
  const [weight, setWeight] = useState("");

  const logWeight = async () => {
    const Username = localStorage.getItem("Username");
    const token = localStorage.getItem("accessToken");
    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      if (!Username || !token) return;

      const weightInt = parseInt(weight, 10);
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
      onSave();
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
    <div className="absolute flex items-center top-16 right-4">
      <div className=" p-4 rounded-lg w-80 bg-[#2C3441] ">
        <div className="flex justify-center">
          <h2 className="text-xl mb-4 text-white">Log Weight</h2>
        </div>

        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="border border-[#5e6a7a] p-2 rounded w-full focus:outline-none "
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
