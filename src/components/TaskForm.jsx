import { useState } from "react";

function TaskForm({ tasks, setTasks }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (text.trim() === "") {
      setError("La tâche ne peut pas être vide.");
      return;
    }

    const newTask = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
    };

    const normalizedText = text.trim().toLowerCase();

    // Vérifier l'existence de la tâche dans la liste
    const taskAlreadyExists = tasks.some(
      (task) => task.text.trim().toLowerCase() === normalizedText,
    );

    if (taskAlreadyExists) {
      setError(`La tâche "${text.trim()}" existe déjà.`);
      return;
    }

    // Ajouter la nouvelle tâche à la liste des tâches
    setTasks((prevTasks) => [...prevTasks, newTask]);

    // Effacer le message d'erreur et réinitialiser le champ de saisie
    setError("");
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

        {error && <p className="error-message">{error}</p>}
      </form>
    </>
  );
}

export default TaskForm;
