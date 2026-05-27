import { TaskList } from "./pages/TaskList";
import { Route, Routes } from "react-router-dom";
import { About } from "./pages/About";
import { TaskPage } from "./pages/TaskPage";
import { HomePage } from "./pages/HomePage";
import { AddTask } from "./pages/AddTask";
import { Layout } from "./components/Layout";
import {Products} from './pages/Products';

// GET - получение данных, нет тела запроса
// POST - передача данных, создание новых данных на сервере
// PUT/PATCH - изменение данных, PUT - передаем все данные, PATCH - передаем те данные которые нужно изменить
// DELETE - удаление данных

// CRUD-операции

// GET
// 1. Все задачи - массив сущностей /tasks
// 2. Одна задача - один объект /tasks/1 -> /tasks/:id - параметры (динамический)
// 3. Query-параметры /tasks?category=джинсы&size=36 - фильтрацию/сортировку
// 4. Пагинация - номер страницы и количество  эл-тов на странице (стандартная и бесконечная лента)

// Глобальное состояние:
// 1. Корзина
// 2. Статус авторизации (данные авторизации)
// 3. Тема приложения
// 4. Уведомления/тосты
// 5. Локализация

// Глобальное состояние -> хук useContext

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/products" element={<Products/>}/>
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/about" element={<About />} />
        <Route path="/tasks/:id" element={<TaskPage />} />
        <Route path="/tasks/add" element={<AddTask />} />
        <Route path="*" element={<h1>Not found</h1>} />
      </Route>
    </Routes>
  );
}

export default App;

// 1. Создать форму для создания задачи
// 2. Создать форму для обновления задачи
// 3. Фильтрация задач: все, невыполненные, выполненные
// 4. Сортировку


// Создать контекст для темы приложения - хранит строку 'light' или 'dark'
// В компонентах ui получается значение контекста 
// Кнопка или toggle - меняет тему

// Создать контекст для авторизации - авторизован пользователь или нет, роль, фио
// Авторизация - форма
// Контекст + Layout = безопасные роуты

// memo, useMemo, useCallback