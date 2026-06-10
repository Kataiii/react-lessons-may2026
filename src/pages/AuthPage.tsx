import { ChangeEvent, useState, SubmitEvent } from "react";
import { login } from "../store/selectors/authSelectors";

export const AuthPage: React.FC = () => {
  const [data, setData] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setData((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    await login(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Введите почту"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Введите пароль"
          onChange={handleChange}
        />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};
