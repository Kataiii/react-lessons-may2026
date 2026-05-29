import { TaskList } from "./pages/TaskList";
import { Route, Routes } from "react-router-dom";
import { About } from "./pages/About";
import { TaskPage } from "./pages/TaskPage";
import { HomePage } from "./pages/HomePage";
import { AddTask } from "./pages/AddTask";
import { Layout } from "./components/Layout";
import { Products } from "./pages/Products";
import { Login } from "./pages/Login";
import { AuthLayout } from "./components/AuthLayout";
import { RoleLayout } from "./components/RoleLayout";
import { Profile } from "./pages/Profile";
import { Perfomance } from "./components/Perfomance";
import { Reports } from "./pages/Reports";
import { NoAccess } from "./pages/NoAccess";
import { GuestLayout } from "./components/GuestLayout";
import { ProductSearch } from "./pages/ProductSearch";

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
        <Route element={<GuestLayout />}>
          <Route path="login" element={<Login />} />
        </Route>

        <Route path="/products" element={<Products />} />
        <Route path="/products-search" element={<ProductSearch />} />
        <Route path="no-access" element={<NoAccess />} />
        <Route path="/about" element={<About />} />
        <Route element={<AuthLayout />}>
          <Route path="profile" element={<Profile />} />
          <Route path="tasks" element={<TaskList />} />
          <Route path="tasks/:id" element={<TaskPage />} />
          <Route path="tasks/add" element={<AddTask />} />
          <Route path="perf" element={<Perfomance />} />
          <Route element={<RoleLayout allowedRoles={["admin"]} />}>
            <Route path="reports" element={<Reports />} />
          </Route>
        </Route>
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

// 1
// Сделать так чтобы после авторизации пользователь не мог зайти обратно на форму авторизации
// Добавить кнопку смены роли на admin и создать страницу /reports, доступную только для администратора

// 2
// Добавить поле поска на страницу с продуктами, фильтрация через useMemo + memo карточки продукта
