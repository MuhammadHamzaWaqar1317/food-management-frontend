import React from "react";
import Header from "../Header";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
function PublicRoute() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  try {
    const { role } = jwtDecode(token);
    console.log(role);
    if (role == "user") {
      console.log("condition met", role);
      return <Navigate to={"/user/sub"} />;
    }
    if (role == "admin") {
      console.log("condition met", role);
      return <Navigate to={"/admin/dashboard"} />;
    }
  } catch (error) {
    console.log("Public Route Error", error);
  }
  return (
    <>
      <Header renderIcon={false} />
      <Outlet />
    </>
  );
}

export default PublicRoute;
