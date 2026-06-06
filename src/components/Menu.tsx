import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useAppSelector } from "../store/store";
import { selectTotalQuantity } from "../store/selectors/cartSelectors";

export const Menu: React.FC = () => {
  const location = useLocation();
  const isActive = location.pathname === "/tasks";
  console.log(isActive);
  const totalQuanity = useAppSelector(selectTotalQuantity);
  const { theme, toogleTheme } = useTheme();

  useEffect(() => {
    console.log("Tasks");
  }, [isActive]);

  return (
    <div>
      <nav
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "15px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link to="/">Главная страница</Link>
        <Link
          to="/tasks"
          style={{ backgroundColor: isActive ? "red" : "green" }}
        >
          Задачи
        </Link>
        <Link to="/about">О нас</Link>
        <Link to="/tasks/add">Добавить задачу</Link>
        <Link to="/products">Продукты</Link>
      </nav>
      <p>Количество элементов в корзине: {totalQuanity}</p>
      <button onClick={toogleTheme}>
        Включить {theme === "light" ? "темную" : "светлую"} тему
      </button>
    </div>
  );
};
