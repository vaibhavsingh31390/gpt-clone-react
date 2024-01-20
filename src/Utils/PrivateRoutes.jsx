import { useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import AuthContext from "../store/AuthContext";

const PrivateRoutes = () => {
  const authCtx = useContext(AuthContext);
  const location = useLocation();
  const publicRoutes = ["/login", "/register"];

  if (authCtx.isAuthenticated) {
    return publicRoutes.includes(location.pathname) ? (
      <Navigate to="/" replace />
    ) : (
      <Outlet />
    );
  } else {
    return publicRoutes.includes(location.pathname) ? (
      <Outlet />
    ) : (
      <Navigate to="/login" replace />
    );
  }
};

export default PrivateRoutes;
