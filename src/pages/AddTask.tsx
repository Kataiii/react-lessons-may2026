import { useNavigate } from "react-router-dom";

export const AddTask: React.FC = () => {
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
