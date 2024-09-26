import React from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate, useNavigate } from "react-router-dom";
function ProtectedRoutes({ children, allowedRole }) {
  const navigate = useNavigate();
  try {
    const token = localStorage.getItem("token");
    const { role } = jwtDecode(token);
    console.log("allowedRoles", allowedRole.includes(role));

    if (!allowedRole.includes(role)) {
      return <Navigate to={"/"} />;
    }
  } catch (error) {
    console.log(error);
    return <Navigate to={"/"} />;
  }

  return children;
}

export default ProtectedRoutes;
