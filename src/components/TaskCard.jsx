function TaskCard({ task, setTasks }) {
  function handleDelete() {
    setTasks((prevTasks) =>
      prevTasks.filter((taskItem) => taskItem.id !== task.id),
    );
  }

  function handleToggle() {
    setTasks((prevTasks) =>
      prevTasks.map((taskItem) => {
        if (taskItem.id === task.id) {
          return { ...taskItem, completed: !taskItem.completed };
        }
        return taskItem;
      }),
    );
  }

  return (
    <div className="task-card">
      <p
        style={{
          textDecoration: task.completed ? "line-through" : "none",
        }}
      >
        {task.text}
      </p>

      <div className="task-actions">
        <button onClick={handleToggle}>
          {task.completed ? "Annuler" : "Terminer"}
        </button>
        <button onClick={handleDelete}>Supprimer</button>
      </div>
    </div>
  );
}

export default TaskCard;
