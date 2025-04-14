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

        setIsValid(true);
      } catch (error) {
        setIsValid(false);
        console.error("Token validation failed:", error);

        if (error.response) {
          // Server responded with an error status
          if (error.response.status === 401) {
            console.warn("Unauthorized: Token expired or invalid.");
            localStorage.removeItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");
            try {
              await axios.delete("http://localhost:3000/api/user/Logout", {
                data: { Token: refreshToken },
              });
            } catch (logoutError) {
              console.error("Logout failed:", logoutError);
            }
          } else {
            console.warn(`Server error: ${error.response.status}`);
          }
        } else if (error.request) {
          // Request was made but no response received
          console.warn("Network issue: Server did not respond.");
        } else {
          // Other unexpected errors
          console.warn("Unexpected error:", error.message);
        }
      }
    };

    checkToken();
  }, [location.pathname]);

  // While loading, prevent flickering
  if (isValid === null) return <div>Loading...</div>;

  return isValid ? <Outlet /> : <Navigate to="/Auth/Login" />;
};

export default ProtectedRoutes;
