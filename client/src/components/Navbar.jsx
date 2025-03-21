import React from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faUser} from "@fortawesome/free-solid-svg-icons"

export default function Navbar() {
  return (
    <div className="bg-[#19212C] flex justify-between items-center ">
      <div>
        <img src={Logo} alt="" className=" bg-[#0E131F] h-25" />
      </div>
      <div className="flex justify-center items-center">
        <Link
          to="/Dashboard/Progress"
          className="text-[#AFA99E] text-[15px] font-normal"
        >
          Dashboard
        </Link>
        <Link
          to="/Dashboard/Foods"
          className="text-[#AFA99E] text-[15px] font-normal"
        >
          Foods
        </Link>
        <Link
          to="/Dashboard/Meals"
          className="text-[#AFA99E] text-[15px] font-normal"
        >
          Meals
        </Link>
        <Link
          to="/Dashboard/Suggestions"
          className="text-[#AFA99E] text-[15px] font-normal"
        >
          Suggestions
        </Link>
      </div>
      <div>
      <FontAwesomeIcon icon={faUser} size="xl" style={{color: "#ff0000",}} />
      </div>
    </div>
  );
}
