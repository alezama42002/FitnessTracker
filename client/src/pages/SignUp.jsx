import React from "react";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

export default function SignUp() {
  return (
    <div className="flex justify-center items-center h-screen bg-[#0E131F]">
      <div className=" w-full mx-8 md:mx-40 lg:mx-60 xl:mx-130">
        <div className="flex flex-col justify-center items-center">
          <img src={Logo} alt="" className="h-30 md:h-40 lg:h-50" />
          <h1 className="text-white font-normal text-[26px] lg:text-[30px] pb-8 pt-3">
            Create your Free Account
          </h1>
        </div>
        <form
          action="#"
          method="POST"
          className="space-y-6 p-8 rounded-[16px] bg-[#19212C] xs:p-4"
        >
          <Input inputName="Username:" />
          <Input inputName="Password:" />
          <Input inputName="Re-enter Password:" />
          <div className="flex justify-center items-center">
            <button className="bg-[#1B9E4B] rounded-[8px] px-14 mt-2 text-white font-normal text-[18px]">
              Sign Up
            </button>
          </div>
          <div className="flex justify-center items-center text-[14px] font-normal mt-6">
            <p className="text-white pr-4 ">Already a member?</p>
            <Link
              to="/Auth/Login"
              className="text-[#1B9E4B] text-[15px] font-normal"
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
