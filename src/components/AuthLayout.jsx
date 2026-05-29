import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const AuthLayout = () => {
  const { isAuth } = useAuth();

  if (!isAuth) return <Navigate to="/login" replace />;

  return <Outlet />;
};
