"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      form.append("name", name);
      form.append("email", email);
      form.append("password", password);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: form,
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
        setTimeout(() => setMessage(""), 5000);
      }

      setName("");
      setEmail("");
      setPassword("");
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
      router.push("/auth/login");
    }
  };

  return (
    <section>
      <div className="login-wrapper border h-screen flex justify-center items-center bg-gray-100">
        <div className="form-wrapper w-full">
          <form
            onSubmit={handleRegister}
            className="max-w-sm mx-auto p-5 rounded-lg bg-white shadow-lg"
          >
            <h1 className="font-bold text-3xl mb-1">Register</h1>
            <span className="block mb-6">
              Isi formulir di bawah ini untuk mendaftar!
            </span>

            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nama
              </label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John Sen"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="john@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mb-4"
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
            {message && (
              <p className="mb-4 text-center text-red-500">{message}</p>
            )}
            <div className="text-register text-center">
              <span>
                Sudah memiliki akun?{" "}
                <Link href="/auth/login" className="text-blue-500 underline">
                  Login disini!
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
