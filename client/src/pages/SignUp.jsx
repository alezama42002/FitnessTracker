import React from "react";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Username: "",
    Password: "",
    ReEnteredPassword: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const signUp = () => {
    if (formData.Password === formData.ReEnteredPassword) {
      localStorage.setItem("SignUp-FormData", JSON.stringify(formData));
      navigate("/Auth/AccountInformation");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#0E131F]">
      <div className=" w-full mx-8 md:mx-40 lg:mx-60 xl:mx-130 2xl:mx-180">
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
          <Input
            inputName="Username"
            field="Username"
            sendData={handleInputChange}
          />
          <Input
            inputName="Password"
            field="Password"
            sendData={handleInputChange}
          />
          <Input
            inputName="Re-enter Password"
            field="ReEnteredPassword"
            sendData={handleInputChange}
          />
          <div className="flex justify-center items-center">
            <button
              type="button"
              onClick={signUp}
              className="bg-[#1B9E4B] rounded-[8px] px-14 mt-2 text-white font-normal text-[18px]"
            >
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
