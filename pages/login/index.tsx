import { useState } from "react";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );

      //   localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);

      window.location.href = "/";
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        const errorMessage = error.response.data.message;
        toast({
          title: `${errorMessage}!`,
          description: "Please check your email and password.",
        });
      } else {
        toast({ title: "Login failed. Please try again later." });
      }
      console.log("Login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 text-sm border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 text-sm border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button
          type="submit"
          className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
        >
          Login
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          dont have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sing up here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
