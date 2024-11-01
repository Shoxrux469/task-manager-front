import { useState, FormEvent } from "react";
import axios from "axios";

export default function AddTaskForm() {
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
    <div className="p-6 bg-gray-50 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
        Add New Task
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          type="submit"
          className="p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}
