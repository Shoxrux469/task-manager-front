import { useEffect, useState } from "react";
import axios from "axios";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface ITask {
  _id: string;
  title: string;
  createdAt: string;
  completed: boolean;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return isNaN(date.getTime())
    ? "Invalid date"
    : date.toISOString().split("T")[0];
};

const getStatusText = (status: boolean): string =>
  status ? "Complete" : "Incomplete";

export function TasksTable() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  if (loading) return <p className="text-center py-4">Loading tasks...</p>;

  return (
    <Table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
      <TableHeader>
        <TableRow className="bg-blue-100">
          <TableHead>Task ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task._id} className="border-t hover:bg-blue-50">
            <TableCell className="p-4 font-medium text-gray-700">
              {task._id}
            </TableCell>
            <TableCell className="p-4 text-gray-600">{task.title}</TableCell>
            <TableCell className="p-4 text-gray-500">
              {formatDate(task.createdAt)}
            </TableCell>
            <TableCell className="p-4">
              <Badge
                variant={task.completed ? "default" : "secondary"}
                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  task.completed
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {getStatusText(task.completed)}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
