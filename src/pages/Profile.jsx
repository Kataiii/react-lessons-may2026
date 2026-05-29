import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h2>Линый кабинет</h2>
      <p>ФИО: {user.fio}</p>
      <p>Роль: {user.role}</p>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
};
