import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const RoleLayout = ({ allowedRoles }) => {
  const { user } = useAuth();

  // Роль пользователя не входит в список разрешённых => нет доступа
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/no-access" replace />;
  }

  return <Outlet />;
};
