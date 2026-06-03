import { ChangeEvent } from "react";

type TaskCardProps = {
  id: number;
  title: string;
  description: string | undefined;
  isDone: boolean;
  onCheck: (id: number, value: boolean) => void;
  onClick: () => void; // VoidFunction
  onDelete: VoidFunction;
  onUpdate: () => void;
};

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  description,
  isDone,
  onCheck,
  onClick,
  onDelete,
  onUpdate,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    onCheck(id, e.target.checked);

  return (
    <div
      style={{ display: "flex", gap: 5, alignItems: "center" }}
      onClick={onClick}
    >
      <div>
        <p>{`№${id} | ${title}`}</p>
        <p>{description}</p>
      </div>
      <input type="checkbox" checked={isDone} onChange={handleChange} />
      <button onClick={onUpdate}>Обновление заголовка</button>
      <button onClick={onDelete}>Удалить задачу</button>
    </div>
  );
};

export default TaskCard;
