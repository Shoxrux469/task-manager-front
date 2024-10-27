import TaskForm from "@/components/task-form/TaskForm";
import { TasksTable } from "@/components/tasks-table/TasksTable";

export default function Home() {
  return (
    <div>
      <h1>Список задач</h1>
      <TaskForm />
      <TasksTable />
    </div>
  );
}
