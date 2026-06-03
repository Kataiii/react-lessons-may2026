import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "./Menu";
import { useTheme } from "../contexts/ThemeContext";

export const Layout = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        backgroundColor: theme === "light" ? "#FFF" : "#333",
        minHeight: "100vh",
      }}
    >
      <header>
        <Menu />
      </header>
      <Outlet />
      <footer> Проект 2026</footer>
    </div>
  );
};
