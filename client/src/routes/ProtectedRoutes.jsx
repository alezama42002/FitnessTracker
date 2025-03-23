import { Outlet, Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const ProtectedRoutes = () => {
  const [isValid, setIsValid] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkToken = async () => {
      const Token = localStorage.getItem("accessToken");
      if (!Token) {
        setIsValid(false);
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:3000/api/user/Valid",
          { Token }
        );

        setIsValid(response.data.Valid);
      } catch (error) {
        setIsValid(false);
      }
    };

    checkToken();
  }, [location.pathname]);

  // While loading, prevent flickering
  if (isValid === null) return <div>Loading...</div>;

  return isValid ? <Outlet /> : <Navigate to="/Auth/Login" />;
};

export default ProtectedRoutes;
