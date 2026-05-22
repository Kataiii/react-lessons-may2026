import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
export const Menu = () => {
  const location = useLocation();
  const isActive = location.pathname === "/tasks";
  console.log(isActive);
  useEffect(() => {
    console.log("Tasks");
  }, [isActive]);

  return (
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
      <Link to="/tasks" style={{ backgroundColor: isActive ? "red" : "green" }}>
        Задачи
      </Link>
      <Link to="/about">О нас</Link>
      <Link to="/tasks/add">Добавить задачу</Link>
    </nav>
  );
};
