import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiUser } from "react-icons/ci";
import Logout from "./Logout";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileMenuRef = useRef(null); // Create a ref for the profile menu
  const profileIconRef = useRef(null); // Create a ref for the profile icon

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close the menu when clicking outside of it
  const handleClickOutside = (event) => {
    if (
      !event.target.closest(".menu-icon") &&
      !event.target.closest(".nav-links")
    ) {
      setMenuOpen(false);
    }

    if (
      profileMenuRef.current &&
      !profileMenuRef.current.contains(event.target) &&
      profileIconRef.current &&
      !profileIconRef.current.contains(event.target) // Exclude clicks on the profile icon
    ) {
      setProfileOpen(false);
    }
  };

  window.addEventListener("click", handleClickOutside);

  // Attach the event listener on mount and cleanup on unmount
  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-[#19212C]  flex justify-between items-center px-4 w-full h-[100px]">
      <div className="flex items-center gap-4">
        <img src={Logo} alt="" className="h-15" />
        <div>
          <a href="https://www.fatsecret.com" className="text-white">
            <img
              src="https://platform.fatsecret.com/api/static/images/powered_by_fatsecret.png"
              srcset="https://platform.fatsecret.com/api/static/images/powered_by_fatsecret_2x.png 2x, https://platform.fatsecret.com/api/static/images/powered_by_fatsecret_3x.png 3x"
              border="0"
            />

            <a href="https://www.fatsecret.com">Powered by fatsecret</a>
          </a>
        </div>
      </div>
      <div
        className={`nav-links ${
          menuOpen ? "visible" : ""
        } flex justify-between items-center gap-10 rounded-lg bg-[#19212C]`}
      >
        <Link
          to="/Dashboard/Progress"
          className="text-[#AFA99E] text-[17px] font-normal hover:text-[#1B9E4B]"
        >
          Dashboard
        </Link>
        <Link
          to="/Dashboard/FoodLog"
          className="text-[#AFA99E] text-[17px] font-normal hover:text-[#1B9E4B]"
        >
          Foods
        </Link>
        <Link
          to="/Dashboard/Recipes"
          className="text-[#AFA99E] text-[17px] font-normal hover:text-[#1B9E4B]"
        >
          Recipes
        </Link>
        <Link
          to="/Dashboard/Suggestions"
          className="text-[#AFA99E] text-[17px] font-normal hover:text-[#1B9E4B]"
        >
          Suggestions
        </Link>
        <div className="lg:hidden">
          <Logout />
        </div>
      </div>
      <div>
        <RxHamburgerMenu
          onClick={toggleMenu}
          size={25}
          color="#AFA99E"
          className="menu-icon hidden"
        />
        <button
          ref={profileIconRef}
          onClick={toggleProfile}
          className="profile-icon cursor-pointer"
        >
          <CiUser size={28} color="#AFA99E" />
        </button>
        <div ref={profileMenuRef}>
          {profileOpen && (
            <div className="absolute right-0 top-23  bg-[#19212c] px-12 py-2 rounded">
              <Logout />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
