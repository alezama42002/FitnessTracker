import React from "react";
import axios from "axios";
import Logo from "../assets/logo.png";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Username: "",
    Password: "",
  });

  // Handles the changes to any of the inputs
  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Calls the api endpoint to validate the login information
  // and provide frontend with accessToken if successful
  const login = async (event) => {
    event.preventDefault();
    if (formData.Username === "" || formData.Password === "")
      alert("Username and Password are Required");
    else {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/user/Login",
          formData
        );

        // Generates accessToken and reroutes user if user is validated by
        // login endpoint
        if (response.data != "Not Allowed") {
          localStorage.setItem("accessToken", response.data.accessToken);
          navigate("/Dashboard/Progress");
        }
      } catch (error) {
        // Error handling for all possible errors
        if (error.response) {
          if (error.response.status === 422) {
            const errorMessage = error.response.data.errors.msg;
            alert(errorMessage);
          } else if (error.response.status === 401)
            alert("Invalid Username or Password");
          else {
            console.log(error);
            alert("An unexpected error occurred. Please try again.");
          }
        }
      }
    }
  };

  return (
    <div className="bg-[#0E131F] flex justify-center items-center h-screen">
      <div className=" w-full mx-8 md:mx-40 lg:mx-60 xl:mx-130 2xl:mx-190 ">
        <div className="flex flex-col justify-center items-center">
          <img src={Logo} alt="" className="h-30 md:h-40 lg:h-50" />
          <h1 className="text-white font-normal text-[26px] pb-8 pt-3">
            Sign in to your Account
          </h1>
        </div>
        <form
          action="#"
          method="POST"
          className="bg-[#19212C] space-y-6 rounded-[16px] p-8"
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
          <div className="flex justify-center items-center">
            <button
              className="bg-[#1B9E4B] rounded-[8px] px-14 py-2 mt-2 text-white font-normal text-[16px]"
              onClick={login}
            >
              Sign In
            </button>
          </div>
          <div className="flex justify-center items-center text-[14px] font-normal mt-6">
            <p className="text-white pr-4 ">Not a member?</p>
            <Link
              to="/Auth/SignUp"
              className="text-[#1B9E4B] text-[15px] font-normal"
            >
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
