import React from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faUser} from "@fortawesome/free-solid-svg-icons"

export default function Navbar() {
  const userInfo = () => {};

  return (
    <div className="bg-[#19212C] flex justify-between items-center px-4 h-[100px]">
      <div>
        <img src={Logo} alt="" className="h-15" />
      </div>
      <div className="flex justify-center items-center gap-10">
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
          Meals
        </Link>
        <Link
          to="/Dashboard/Suggestions"
          className="text-[#AFA99E] text-[17px] font-normal hover:text-[#1B9E4B]"
        >
          Suggestions
        </Link>
      </div>
      <div>
        <CiUser />
      </div>
    </div>
  );
}
