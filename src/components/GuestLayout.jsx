import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const GuestLayout = () => {
  const { isAuth } = useAuth();

  if (isAuth) return <Navigate to="/profile" replace />;

  return <Outlet />;
};
