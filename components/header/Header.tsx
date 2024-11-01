import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/signup");
  };

  return (
    <header className="flex justify-between items-center p-6 bg-blue-600 text-white shadow-md">
      <Link href="/" passHref>
        <span className="text-2xl font-bold cursor-pointer hover:text-blue-200 transition duration-300">
          Task Manager
        </span>
      </Link>
      <nav className="space-x-6">
        <Link href="/add-task" passHref>
          <span className="cursor-pointer hover:text-blue-200 transition duration-300">
            Add Task
          </span>
        </Link>
        <Link href="/update-task" passHref>
          <span className="cursor-pointer hover:text-blue-200 transition duration-300">
            Update Task
          </span>
        </Link>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 rounded-md hover:bg-red-600 transition duration-300 text-white font-medium"
        >
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
