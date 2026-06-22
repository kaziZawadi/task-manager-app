import React from "react";
import TaskCard from "./TaskCard.jsx";

function TaskList({ tasks, setTasks, editingTaskId, setEditingTaskId }) {
  return (
    <div>
      <p>Task List</p>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          setTasks={setTasks}
          editingTaskId={editingTaskId}
          setEditingTaskId={setEditingTaskId}
        />
      ))}
    </div>
  );
}

export default TaskList;
