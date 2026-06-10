import { TaskList } from "./pages/TaskList";
import { Route, Routes } from "react-router-dom";
import { About } from "./pages/About";
import { TaskPage } from "./pages/TaskPage";
import { HomePage } from "./pages/HomePage";
import { AddTask } from "./pages/AddTask";
import { Layout } from "./components/Layout";
import { Products } from "./pages/Products";
import { AuthPage } from "./pages/AuthPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/products" element={<Products />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/about" element={<About />} />
        <Route path="/tasks/:id" element={<TaskPage />} />
        <Route path="/tasks/add" element={<AddTask />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<h1>Not found</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
