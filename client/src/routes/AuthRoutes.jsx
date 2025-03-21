import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import AccountInformation from "../pages/AccountInformation";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/AccountInformation" element={<AccountInformation />} />
    </Routes>
  );
};

export default AuthRoutes;
