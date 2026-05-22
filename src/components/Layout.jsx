import { Outlet } from "react-router-dom";
import { Menu } from "./Menu";

export const Layout = () => {
  return (
    <div>
      <header>
        <Menu />
      </header>
      <Outlet />
      <footer> Проект 2026</footer>
    </div>
  );
};
