import { useState } from "react";

function TaskCard({ task, setTasks, editingTaskId, setEditingTaskId }) {
  const [editedText, setEditedText] = useState("");

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

  function handleEdit() {
    setEditingTaskId(task.id);
    setEditedText(task.text);
  }

  function handleCancel() {
    setEditingTaskId(null);
    setEditedText("");
  }

  function handleSave() {
    setTasks((prevTasks) =>
      prevTasks.map((taskItem) => {
        if (taskItem.id === task.id) {
          return { ...taskItem, text: editedText.trim() };
        }

        return taskItem;
      }),
    );

    setEditingTaskId(null);
    setEditedText("");
  }

  return (
    <div className={task.completed ? "task-card completed" : "task-card"}>
      <p>
        {editingTaskId === task.id ? (
          <input
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
        ) : (
          <p
            style={{
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            {task.text}
          </p>
        )}
      </p>

      <div className="task-actions">
        {editingTaskId === task.id ? (
          <>
            <button onClick={handleSave}>Sauvegarder</button>
            <button onClick={handleCancel}>Annuler</button>
          </>
        ) : (
          <>
            {!task.completed && (
              <button className="modify-btn" onClick={handleEdit}>
                Modifier
              </button>
            )}

            <button className="toggle-btn" onClick={handleToggle}>
              {task.completed ? "Annuler" : "Terminer"}
            </button>

            <button className="delete-btn" onClick={handleDelete}>
              Supprimer
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskCard;
