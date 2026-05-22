import { useState } from "react";

function TaskForm({ setTasks }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (text.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
    };

    // Récupérer les props dans la Tasklist

    // Ajouter la nouvelle tâche à la liste des tâches
    setTasks((prevTasks) => [...prevTasks, newTask]);

    // Réinitialiser le champ de saisie
    setText("");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setText(e.target.value)}
          value={text}
          type="text"
          placeholder="Saisir une tâche..."
        />
        <button type="submit">Ajouter</button>
      </form>
    </>
  );
}

export default TaskForm;
