import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const Token = localStorage.getItem("accessToken");

  return Token ? <Outlet /> : <Navigate to="/Auth/Login" />;
};

export default ProtectedRoutes;
