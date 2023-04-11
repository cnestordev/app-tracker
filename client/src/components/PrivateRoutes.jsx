import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = ({ user }) => {
  const id = user && user._id;
  return id ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
