import React from "react";
import TaskCard from "./TaskCard.jsx";

function TaskList({ tasks, setTasks }) {
  return (
    <div>
      <p>Task List</p>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} setTasks={setTasks} />
      ))}
    </div>
  );
}

export default TaskList;
