import React, { useState } from "react";

export default function PopupQuantity({ onClose, onSave, text }) {
  const [quantity, setQuantity] = useState("");

  const handleSave = () => {
    onSave(quantity);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className=" p-4 rounded-lg w-80 bg-[#2C3441] ">
        <div className="flex justify-center">
          <h2 className="text-xl mb-4 text-white">{text}</h2>
        </div>

        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border p-2 rounded w-full focus:outline-none "
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
            onClick={handleSave}
            className="bg-green-500 text-white py-1 px-4 rounded"
          >
            Log
          </button>
        </div>
      </div>
    </div>
  );
}
