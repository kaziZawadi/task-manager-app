import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";

function App() {
  // Liste de toutes les tâches
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Filtre actuellement sélectionné (all, active, completed)
  const [filter, setFilter] = useState("all");

  // Identifiant de la tâche actuellement en cours d'édition
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Sauvegarde automatique des tâches dans le localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Liste des tâches affichées selon le filtre sélectionné
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;

    return false;
  });

  // Statistiques des tâches
  const totalTasks = tasks.length;

  const activeTasks = tasks.filter((task) => !task.completed).length;

  const completedTasks = tasks.filter((task) => task.completed).length;

  // Retourne la classe CSS du bouton de filtre actif
  function getFilterClass(filterName) {
    return filter === filterName ? "active-filter" : "";
  }

  // Supprime toutes les tâches terminées après confirmation
  function clearCompletedTasks() {
    const confirmed = confirm("Supprimer toutes les tâches terminées ?");

    if (confirmed) {
      setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
    }
  }

  return (
    <div className="app">
      <h1>Task Manager App</h1>

      <TaskForm tasks={tasks} setTasks={setTasks} />

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

        <button onClick={clearCompletedTasks} disabled={completedTasks === 0}>
          Supprimer les tâches terminées.
        </button>
      </div>

      <p>Total : {totalTasks}</p>
      <p>Actives : {activeTasks}</p>
      <p>Terminées : {completedTasks}</p>
      <p
        className={
          activeTasks === 0 ? "status-message success" : "status-message"
        }
      >
        {activeTasks === 0
          ? "Bravo ! Toutes les tâches sont terminées 🎉"
          : `${activeTasks} tâche(s) restante(s)`}
      </p>

      <TaskList
        tasks={filteredTasks}
        allTasks={tasks}
        setTasks={setTasks}
        editingTaskId={editingTaskId}
        setEditingTaskId={setEditingTaskId}
      />
    </div>
  );
}

export default App;
