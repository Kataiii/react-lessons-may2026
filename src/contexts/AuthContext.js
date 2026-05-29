import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("Контекст не подключен");
  return auth;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userInStorage = localStorage.getItem("user");
    if (userInStorage) return JSON.parse(userInStorage);
    return null;
  });

  const login = (fio, role) => {
    const newUser = { fio, role };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const toggleRole = () => {
    setUser((prev) => {
      if (!prev) return prev;
      const newRole = prev.role === "admin" ? "user" : "admin";
      const updated = { ...prev, role: newRole };
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
  };

  const isAuth = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuth, toggleRole }}>
      {children}
    </AuthContext.Provider>
  );
};
