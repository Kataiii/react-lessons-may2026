import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

type Task = {
  id: number;
  title: string;
  description: string;
  isDone: boolean;
};

export const TaskPage: React.FC = () => {
  const { id } = useParams();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    fetch(`https://9f71319c30fc7a13.mokky.dev/tasks/${id}`)
      .then((resp) => resp.json())
      .then((data) => setTask(data));
  }, [id]);
  console.log(task);
  return <div>task {id}</div>;
};
