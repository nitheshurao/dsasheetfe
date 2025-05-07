import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const stored = JSON.parse(localStorage.getItem("dsaSheet"))
  const token = stored?.token;
  return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
