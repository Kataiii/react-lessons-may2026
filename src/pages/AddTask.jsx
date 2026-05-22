import { useNavigate } from "react-router-dom";

export const AddTask = () => {
  const navigate = useNavigate();

  console.log(navigate);

  const handleAddTask = () => {
    navigate("/");
  };

  return (
    <div>
      <button onClick={handleAddTask}>Добавить</button>
    </div>
  );
};
