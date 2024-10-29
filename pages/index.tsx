import TaskForm from "@/components/task-form/TaskForm";
import { TasksTable } from "@/components/tasks-table/TasksTable";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      router.push("/signup");
    }
  }, [router]);

  return (
    <div>
      <h1>Список задач</h1>
      <TaskForm />
      <TasksTable />
    </div>
  );
}
