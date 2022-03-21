import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStoreState } from "easy-peasy";

const ProtectedRoute = () => {
  const { wallet } = useStoreState((state) => state.main.entities);
  const isSignedIn = wallet.isSignedIn();

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
