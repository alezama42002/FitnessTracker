import React from "react";
import Logo from "../assets/Logo.png";
import Input from "../components/Input";
import { useState } from "react";

export default function AccountInformation() {
  const [formData, setFormData] = useState({
    Username: "",
    Password: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
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
            inputName="First Name:"
            field="First-Name"
            sendData={handleInputChange}
          />
          <Input
            inputName="Last Name:"
            field="Last-Name"
            sendData={handleInputChange}
          />
          <Input
            inputName="Gender:"
            field="Gender"
            sendData={handleInputChange}
          />
          <Input inputName="Age:" field="Age" sendData={handleInputChange} />
          <Input
            inputName="Weight:"
            field="Weight"
            sendData={handleInputChange}
          />
          <Input
            inputName="Height:"
            field="Height"
            sendData={handleInputChange}
          />

          <div className="flex justify-center items-center">
            <button className="bg-[#1B9E4B] rounded-[8px] px-14 mt-2 text-white font-normal text-[20px]">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

