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

  // Handles the changes to any of the inputs
  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Takes care of the select input changes
  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handles the collection and structuring of the needed data for
  // creating a user
  const submitInformation = async (event) => {
    event.preventDefault();

    // Gets needed user data from SignUp page
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
      calorieGoal: 0,
      proteinGoal: 0,
      carbGoal: 0,
      fatGoal: 0,
    };

    if (
      formData.FirstName === "" ||
      formData.LastName === "" ||
      formData.Gender === "" ||
      formData.Age === "" ||
      formData.Weight === "" ||
      formData.Height === "" ||
      formData.ActivityLevel === ""
    )
      alert("All Inputs are Required");
    else {
      try {
        const apiURL = import.meta.env.VITE_API_URL;
        await axios.post(`${apiURL}/user/AddUser`, newUserData);

        localStorage.removeItem("SignUp-FormData");
        navigate("/Auth/Login");
      } catch (error) {
        // Error handling for all possible errors
        if (error.response) {
          if (error.response.status === 422) {
            const errorMessage = error.response.data.errors.msg;
            alert(errorMessage);
          } else if (error.response.status === 500) {
            console.log(error);
            alert("An unexpected error occurred. Please try again.");
          }
        }
      }
    }
  };

  return (
    <div className="bg-[#0E131F] flex justify-center items-center my-14">
      <div className=" w-full mx-90 sm:max-lg:mx-10 lg:mx-30">
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
            inputName="Weight (kg)"
            field="Weight"
            sendData={handleInputChange}
          />
          <Input
            inputName="Height (cm)"
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
              className="bg-[#1B9E4B] rounded-[8px] px-14 py-2 mt-2 text-white font-normal text-[16px]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
