import { useState, FormEvent } from "react";
import axios from "axios";

export default function TaskForm() {
  const [taskId, setTaskId] = useState<string>("");
  const [newTitle, setNewTitle] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);

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
    <div className="p-6 bg-gray-50 rounded-lg shadow-md w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
        Update Task
      </h2>
      <form onSubmit={handleUpdate} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Task ID for updating"
          value={taskId}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          onChange={(e) => setTaskId(e.target.value)}
        />
        <input
          type="text"
          placeholder="New Task Title"
          value={newTitle}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-gray-600">Mark as completed</span>
        </label>
        <button
          type="submit"
          className="p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Update Task
        </button>
      </form>
    </div>
  );
}
