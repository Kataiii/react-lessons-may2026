import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import { useSearchParams } from "react-router-dom";
import { Menu } from "../components";

type Task = {
  id: number;
  title: string;
  description: string;
  isDone: boolean;
};

export const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [limit, setLimit] = useState<number>(3);
  const [page, SetPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(2);
  const [searchParams, setSearchParams] = useSearchParams();

  const status = searchParams.get("status");
  console.log(status);

  useEffect(() => {
    handleGetTask();
  }, [page]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleGetTask = async () => {
    setIsLoading(true);

    // Всё что находится в url это строка, null или undefined
    const queryParams = new URLSearchParams();
    if (page) queryParams.set("page", String(page));
    if (limit) queryParams.set("limit", String(limit));

    // Цепочка then
    fetch(`https://9f71319c30fc7a13.mokky.dev/tasks?${queryParams.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Произошла ошибка при получении задач");
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setTasks(data.items);
        setIsLoading(false);
      })
      .catch((error) => console.log("Ошибка ", error));
  };

  const handleCheck = (id: number, value: boolean) => {
    console.log(id);
    console.log(value);

    const task = tasks.find((task) => task.id === id);
    if (!task) return;

    setTasks((prev) =>
      [
        ...prev.filter((task) => task.id !== id),
        { ...task, isDone: value },
      ].sort((a, b) => a.id - b.id)
    );
  };

  // GET-запрос для одной задачи
  const handleClick = async (id: number) => {
    try {
      const response = await fetch(
        `https://9f71319c30fc7a13.mokky.dev/tasks/${id}`
      );
      if (!response.ok) throw new Error();
      const data = await response.json();
      console.log("Задача ", data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTask = async () => {
    try {
      const response = await fetch("https://9f71319c30fc7a13.mokky.dev/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Новая задача",
          description: "Новая задача какая-то",
          isDone: false,
        }),
      });
      if (!response.ok) throw new Error();
      await handleGetTask();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateTask = async (id: number) => {
    try {
      const response = await fetch(
        `https://9f71319c30fc7a13.mokky.dev/tasks/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: "Это новый заголовок",
          }),
        }
      );
      if (!response.ok) throw new Error();
      await handleGetTask();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      const response = await fetch(
        `https://9f71319c30fc7a13.mokky.dev/tasks/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) throw new Error();
      await handleGetTask();
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <p>Подожите, пожалуйста, данные грузятся...</p>;

  return (
    <div>
      <p>Лист задачек</p>
      <p>Текущий фильтр {status}</p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "15px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button onClick={() => setSearchParams({ status: "active" })}>
          Невыполненные
        </button>
        <button onClick={() => setSearchParams({ status: "done" })}>
          Выполненные
        </button>
        <button onClick={() => setSearchParams({})}>Все</button>
      </div>
      <button onClick={handleAddTask}>Добавить задачу</button>

      {
        <div>
          {!tasks.length ? ( //tasks.lenght === 0
            <p>Задач нет</p>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                isDone={task.isDone}
                onCheck={handleCheck}
                onClick={() => handleClick(task.id)}
                onDelete={() => handleDeleteTask(task.id)}
                onUpdate={() => handleUpdateTask(task.id)}
              />
            ))
          )}
        </div>
      }

      {[1, 2].map((item) => (
        <button key={item} onClick={() => SetPage(item)}>
          {item}
        </button>
      ))}
    </div>
  );
};
