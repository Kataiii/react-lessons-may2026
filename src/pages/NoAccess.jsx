import { Link } from "react-router-dom";

export const NoAccess = () => {
  return (
    <div>
      <h2>Нет доступа</h2>
      <p>У вашей роли недостаточно прав для этой страницы.</p>
      <Link to="/">На главную</Link>
    </div>
  );
};
