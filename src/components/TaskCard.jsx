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
    <div>
      <p>{task.text}</p>

      <button onClick={handleToggle}>Terminer</button>
      <button onClick={handleDelete}>Supprimer</button>
    </div>
  );
}

export default TaskCard;
