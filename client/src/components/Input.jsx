import React from "react";

export default function Input({ inputName }) {
  return (
    <div>
      <label
        htmlFor="username"
        className="block text-sm/6 text-white font-normal text-[18px]"
      >
        {inputName}
      </label>
      <div className="mt-2">
        <input
          id="Username"
          name="Username"
          type="text"
          required
          autoComplete="Username"
          className="block w-full rounded-md bg-[#2C3441] px-3 py-1.5 text-base text-white  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1B9E4B] sm:text-sm/6"
        />
      </div>
    </div>
  );
}
