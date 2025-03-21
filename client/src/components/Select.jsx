import React from "react";

export default function Select({ labelName, options, sendData }) {
  const handleChange = (event) => {
    sendData(event);
  };

  return (
    <div className="w-full max-w-sm min-w-[200px]">
      <label className="block text-sm/6 text-white font-normal text-[18px] pb-2">
        Select Activity Level:
      </label>
      <div className="relative">
        <select
          onChange={handleChange}
          name={labelName}
          className="w-full appearance-none bg-[#2C3441] text-white text-sm  rounded-md pl-3 pr-10 py-2 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#1B9E4B] focus:border-[#1B9E4B] hover:border-[#1B9E4B] shadow-sm focus:shadow-md cursor-pointer"
        >
          <option value="" disabled selected hidden></option>
          {options.map((option, index) => (
            <option key={index} value={option} className="text-white">
              {option}
            </option>
          ))}
        </select>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-5 w-5 absolute top-1/2 right-3 transform -translate-y-1/2 text-white pointer-events-none"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
          />
        </svg>
      </div>
    </div>
  );
}
