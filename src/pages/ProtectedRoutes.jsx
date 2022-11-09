import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function ProtectedRoutes() {
  const { currentUser } = useAuthContext();
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}

export default ProtectedRoutes;
