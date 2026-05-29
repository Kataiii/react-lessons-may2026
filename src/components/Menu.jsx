import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Menu = () => {
  const { user, isAuth, logout } = useAuth();
  const navigate = useNavigate();

  const { items } = useCart();
  const { theme, toogleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
        {isAuth && <Link to="/tasks">Задачи</Link>}
        <Link to="/about">О нас</Link>
        {isAuth && <Link to="/tasks/add">Добавить задачу</Link>}
        <Link to="/products">Продукты</Link>
        {!isAuth ? (
          <Link to="/login">Войти</Link>
        ) : (
          <button onClick={handleLogout}>Выйти</button>
        )}
      </nav>
      <p>Количество элементов в корзине: {items.length}</p>
      <button onClick={toogleTheme}>
        Включить {theme === "light" ? "темную" : "светлую"} тему
      </button>
    </div>
  );
};
