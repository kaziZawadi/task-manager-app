function TaskCard({ task, setTasks }) {
  function handleDelete() {
    setTasks((prevTasks) =>
      prevTasks.filter((taskItem) => taskItem.id !== task.id),
    );
  }
  return (
    <div>
      <p>{task.text}</p>

      <button>Terminer</button>

      <button onClick={handleDelete}>Supprimer</button>
    </div>
  );
}

export default TaskCard;
