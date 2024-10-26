import { useState, FormEvent } from "react";
import axios from "axios";

export default function TaskForm() {
  const [title, setTitle] = useState<string>("");

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

  return (
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
  );
}
