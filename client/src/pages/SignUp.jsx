import React from "react";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Username: "",
    Password: "",
    ReEnteredPassword: "",
  });

  // Handles the changes to any of the inputs
  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Stores form data is local storage so it can be referred to in account
  // information page
  const signUp = async () => {
    // Error Handling in case user does not provide needed information
    // or provided incorrect information
    if (
      !formData.Username ||
      !formData.Password ||
      !formData.ReEnteredPassword
    ) {
      alert("All inputs are required");
    } else if (formData.Username.length < 4) {
      alert("Username must be at least 4 characters long");
    } else if (!/[a-zA-Z]/.test(formData.Username)) {
      alert("Username must contain at least one letter");
    } else if (formData.Password.length < 6) {
      alert("Password must be at least 6 characters long");
    } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(formData.Password)) {
      alert("Password must contain at least one letter and one number");
    } else if (formData.Password !== formData.ReEnteredPassword) {
      alert("Password and Re-entered Password must match");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/user/Username",
          {
            Username: formData.Username,
          }
        );

        localStorage.setItem("SignUp-FormData", JSON.stringify(formData));
        navigate("/Auth/AccountInformation");
      } catch (error) {
        alert("Username is already taken");
      }
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
              className="bg-[#1B9E4B] rounded-[8px] px-14 py-1 mt-2 text-white font-normal text-[16px] cursor-pointer"
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
