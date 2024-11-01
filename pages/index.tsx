import { TasksTable } from "@/components/tasks-table/TasksTable";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("token");
    if (!user) {
      router.push("/signup");
    }
  }, [router]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Список задач</h1>
      <TasksTable />
    </div>
  );
}
