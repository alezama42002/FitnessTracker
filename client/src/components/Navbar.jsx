import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiUser } from "react-icons/ci";
import Logout from "./Logout";

export default function Navbar() {
  const userInfo = () => {};
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="bg-[#19212C] flex justify-between items-center px-4 w-full h-[100px]">
      <div>
        <img src={Logo} alt="" className="h-15" />
      </div>
      <div
        className={`nav-links ${
          menuOpen ? "visible" : ""
        } flex justify-between items-center gap-10`}
      >
        <Link
          to="/Dashboard/Profile"
          className="menu-profile hidden text-[#AFA99E] text-[17px] font-normal hover:text-[#1B9E4B]"
        >
          Profile
        </Link>
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
        <Logout />
      </div>
      <div>
        <RxHamburgerMenu
          onClick={toggleMenu}
          size={25}
          color="#AFA99E"
          className="menu-icon hidden"
        />
        <CiUser
          size={28}
          color="#AFA99E"
          onClick={userInfo}
          className="profile-icon hover:cursor-pointer"
        />
      </div>
    </div>
  );
}
