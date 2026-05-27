import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "./Menu";
import {CartContext} from '../contexts/CartContext';
 
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
