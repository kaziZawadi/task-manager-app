import React from "react";

function TaskList({ tasks, setTasks }) {
  return (
    <div>
      <p>Task List</p>
      {tasks.map((task) => (
        <div key={task.id}>
          <p>{task.text}</p>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
