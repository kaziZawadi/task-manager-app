import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
  });

  const totalTasks = tasks.length;

  const activeTasks = tasks.filter((task) => !task.completed).length;

  const completedTasks = tasks.filter((task) => task.completed).length;

  function getFilterClass(filterName) {
    return filter === filterName ? "active-filter" : "";
  }

  return (
    <div className="app">
      <h1>Task Manager App</h1>

      <TaskForm setTasks={setTasks} />

      <div className="filters">
        <button
          className={getFilterClass("all")}
          onClick={() => setFilter("all")}
        >
          Toutes
        </button>

        <button
          className={getFilterClass("active")}
          onClick={() => setFilter("active")}
        >
          Actives
        </button>

        <button
          className={getFilterClass("completed")}
          onClick={() => setFilter("completed")}
        >
          Terminées
        </button>
      </div>

      <p>Total : {totalTasks}</p>
      <p>Actives : {activeTasks}</p>
      <p>Terminées : {completedTasks}</p>
      <p
        className="status-message"
        style={{
          color: activeTasks === 0 ? "green" : "black",
        }}
      >
        {activeTasks === 0
          ? "Bravo ! Toutes les tâches sont terminées 🎉"
          : `${activeTasks} tâche(s) restante(s)`}
      </p>

      <TaskList tasks={filteredTasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
