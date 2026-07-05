import TaskCard from "./TaskCard.jsx";

function TaskList({
  tasks,
  allTasks,
  setTasks,
  editingTaskId,
  setEditingTaskId,
}) {
  return (
    <div>
      <p>Task List</p>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          tasks={allTasks}
          setTasks={setTasks}
          editingTaskId={editingTaskId}
          setEditingTaskId={setEditingTaskId}
        />
      ))}
    </div>
  );
}

export default TaskList;
