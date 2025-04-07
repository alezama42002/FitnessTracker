import React from "react";
import axios from "axios";


export default function Logout() {

  const handleLogout = async () => {

  }

  return (
    <button
      onClick={handleLogout}
      className="text-[#AFA99E] text-[17px] font-normal hover:text-[#1B9E4B] cursor-pointer"
    >
      Logout
    </button>
  );
}