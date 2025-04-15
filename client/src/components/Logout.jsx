import React from "react";
import axios from "axios";

export default function Logout() {
  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      await axios.delete(`${apiUrl}/user/Logout`, {
        data: { Token: refreshToken },
      });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("Username");
      window.location.href = "Auth/Login"; // Redirect to login page
    } catch (error) {
      console.error("Error logging out:", error.response.message);
      alert("An error occurred while logging out. Please try again.");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="text-[#AFA99E] text-[17px] font-normal hover:text-[#1B9E4B] cursor-pointer"
    >
      Logout
    </button>
  );
}
