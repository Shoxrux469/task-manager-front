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

// Updated ITask interface
interface ITask {
  _id: string; // Changed from id to _id
  title: string;
  createdAt: string;
  completed: boolean; // Changed from status to completed
}

const getStatusText = (status: boolean): string => {
  return status ? "Complete" : "Incomplete";
};

export function TasksTable() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tasks");
        setTasks(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <Table className="min-w-full bg-white border shadow-md">
      <TableHeader>
        <TableRow className="bg-gray-50">
          <TableHead>Task ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task._id} className="border-t">
            <TableCell className="font-medium">{task._id}</TableCell>
            <TableCell>{task.title}</TableCell>
            <TableCell>
              {(() => {
                const date = new Date(task.createdAt);
                // Check if the date is valid
                if (isNaN(date.getTime())) {
                  console.error("Invalid date value:", task.createdAt);
                  return "Invalid date";
                }
                return date.toISOString().split("T")[0];
              })()}
            </TableCell>
            <TableCell>
              <Badge
                variant={task.completed ? "default" : "secondary"}
                className="px-2 py-1 text-xs font-semibold rounded-full"
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
