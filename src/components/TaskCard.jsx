import { useState } from "react";

function TaskCard({ task, tasks, setTasks, editingTaskId, setEditingTaskId }) {
  const [editedText, setEditedText] = useState("");
  const [error, setError] = useState("");

  // Supprimer la tâche sélectionnée
  function handleDelete() {
    setTasks((prevTasks) =>
      prevTasks.filter((taskItem) => taskItem.id !== task.id),
    );
  }

  // Basculer la tâche entre active et terminée
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

  // Passer en mode édition
  function handleEdit() {
    setEditingTaskId(task.id);
    setEditedText(task.text);
    setError("");
  }

  // Annuler l'édition
  function handleCancel() {
    setEditingTaskId(null);
    setEditedText("");
    setError("");
  }

  // Sauvegarder les modifications après validation
  function handleSave() {
    if (editedText.trim() === "") {
      setError("La tâche ne doit pas être vide.");
      return;
    }

    const normalizedEditedText = editedText.trim().toLowerCase();

    const taskAlreadyExists = tasks.some(
      (taskItem) =>
        taskItem.text.trim().toLowerCase() === normalizedEditedText &&
        taskItem.id !== editingTaskId,
    );

    if (taskAlreadyExists) {
      setError(`La tâche "${editedText.trim()}" existe déjà.`);
      return;
    }

    setTasks((prevTasks) =>
      prevTasks.map((taskItem) => {
        if (taskItem.id === task.id) {
          return { ...taskItem, text: editedText.trim() };
        }

        return taskItem;
      }),
    );
    setError("");
    setEditingTaskId(null);
    setEditedText("");
  }

  return (
    <div className={task.completed ? "task-card completed" : "task-card"}>
      {editingTaskId === task.id ? (
        <>
          <input
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}
        </>
      ) : (
        <p
          style={{
            textDecoration: task.completed ? "line-through" : "none",
          }}
        >
          {task.text}
        </p>
      )}

      <div className="task-actions">
        {editingTaskId === task.id ? (
          <>
            <button className="save-btn" onClick={handleSave}>
              Sauvegarder
            </button>
            <button className="cancel-btn" onClick={handleCancel}>
              Annuler
            </button>
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
