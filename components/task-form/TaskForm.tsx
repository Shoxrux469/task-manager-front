import { useState, FormEvent } from "react";
import axios from "axios";

export default function TaskForm() {
  const [title, setTitle] = useState<string>("");
  const [taskId, setTaskId] = useState<string>("");
  const [newTitle, setNewTitle] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);

  // POST-запрос для добавления новой задачи
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/tasks", {
        title,
      });
      console.log("Task added:", response.data);
      setTitle("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error adding task:", error.response?.data);
      } else {
        console.error("Error:", error);
      }
    }
  };

  // PATCH-запрос для обновления задачи
  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!taskId) {
      console.error("Task ID is required for updating.");
      return;
    }
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/tasks/${taskId}`,
        {
          title: newTitle,
          completed: completed, // передаем значение completed
        }
      );
      console.log("Task updated:", response.data);
      setTaskId("");
      setNewTitle("");
      setCompleted(false); // сбрасываем чекбокс после обновления
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error updating task:", error.response?.data);
      } else {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Введите название задачи"
          value={title}
          className="border border-black rounded"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Добавить задачу</button>
      </form>

      <form onSubmit={handleUpdate} className="mt-4">
        <input
          type="text"
          placeholder="ID задачи для обновления"
          value={taskId}
          className="border border-black rounded mr-2"
          onChange={(e) => setTaskId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Новое название задачи"
          value={newTitle}
          className="border border-black rounded"
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <label className="ml-2">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </label>
        <button type="submit" className="ml-2">
          Обновить задачу
        </button>
      </form>
    </div>
  );
}
