import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [fio, setFio] = useState("");
  const [role, setRole] = useState("user");

  const { login } = useAuth();
  const navige = useNavigate();

  const handleSumbit = (e) => {
    e.preventDefault();
    if (!fio) return;
    login(fio, role);
    navige("/profile");
  };

  return (
    <div>
      <form
        onSubmit={handleSumbit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: 250,
        }}
      >
        <h1>Вход</h1>
        <input
          value={fio}
          onChange={(e) => setFio(e.target.value)}
          placeholder="ФИО"
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value={"user"}>Пользователь</option>
          <option value={"admin"}>Администратор</option>
        </select>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};
