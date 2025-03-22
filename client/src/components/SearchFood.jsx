import React from "react";

export default function SearchFood() {
  return (
    <div className="bg-[#19212C] px-8 mt-6 rounded-[8px] pt-6">
      <div className="bg-[#2C3441] rounded-md py-2 pl-8">
        <input
          type="text"
          placeholder="Search for food items..."
          className="w-full focus:outline-none"
        />
      </div>
      <div className="flex flex-col items-center justify-center text-[#AFA99E] pt-8 gap-3 pb-6">
        <p>Search for foods to add to your profile</p>
        <p>Try searching for items like 'chicken', 'apple', or 'rice'</p>
      </div>
    </div>
  );
}
