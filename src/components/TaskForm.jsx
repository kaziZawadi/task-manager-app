import { useState } from "react";

function TaskForm({ tasks, setTasks }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (text.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
    };

    // Vérifier l'existence de la tâche dans la liste
    const taskAlreadyExists = tasks.some((task) => task.text === text.trim());

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

        {error && <p>{error}</p>}
      </form>
    </>
  );
}

export default TaskForm;
