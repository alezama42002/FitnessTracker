import React from "react";
import axios from "axios";
import Input from "../components/Input";
import { useState } from "react";
import Select from "../components/Select";
import { useNavigate } from "react-router-dom";

export default function AccountInformation() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Gender: "",
    Age: "",
    Weight: "",
    Height: "",
    ActivityLevel: "",
  });

  const activityLevelOptions = [
    "Sedentary",
    "Lightly Active",
    "Moderately Active",
    "Very Active",
    "Extra Active",
    "Professional Athlete",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitInformation = async (event) => {
    event.preventDefault();

    const signUpFormData = JSON.parse(localStorage.getItem("SignUp-FormData"));

    const newUserData = {
      Username: signUpFormData.Username,
      Password: signUpFormData.Password,
      Height: formData.Height,
      Weight: formData.Weight,
      Age: formData.Age,
      firstName: formData.FirstName,
      lastName: formData.LastName,
      activityLevel: formData.ActivityLevel,
      Gender: formData.Gender,
    };

    try {
      await axios.post("http://localhost:3000/api/user/AddUser", newUserData);

      localStorage.removeItem("SignUp-FormData");
      navigate("/Auth/Login");
    } catch (error) {
      return `Error: ${error}`;
    }
  };

  return (
    <div className="bg-[#0E131F] flex justify-center items-center h-screen">
      <div className=" w-full mx-115 lg:mx-90">
        <form
          action="#"
          method="POST"
          className="bg-[#19212C] space-y-6 rounded-[16px] p-8"
        >
          <div className="flex justify-center items-center">
            <h1 className="text-white font-normal text-[30px]">
              Account Information
            </h1>
          </div>
          <Input
            inputName="First Name"
            field="FirstName"
            sendData={handleInputChange}
          />
          <Input
            inputName="Last Name"
            field="LastName"
            sendData={handleInputChange}
          />
          <Input
            inputName="Gender"
            field="Gender"
            sendData={handleInputChange}
          />
          <Input inputName="Age" field="Age" sendData={handleInputChange} />
          <Input
            inputName="Weight"
            field="Weight"
            sendData={handleInputChange}
          />
          <Input
            inputName="Height"
            field="Height"
            sendData={handleInputChange}
          />
          <Select
            labelName="ActivityLevel"
            sendData={handleSelectChange}
            options={activityLevelOptions}
          ></Select>
          <div className="flex justify-center items-center">
            <button
              type="button"
              onClick={submitInformation}
              className="bg-[#1B9E4B] rounded-[8px] px-14 mt-2 text-white font-normal text-[20px]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
