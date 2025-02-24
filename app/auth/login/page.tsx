"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPages() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      alert("Email dan password salah!");
    } else {
      if (session?.user?.role == "WRITER") {
        router.push("/dashboard/writer");
      } else {
        router.push("/dashboard/admin");
      }
    }
  };

  return (
    <section>
      <div className="login-wrapper border h-screen flex justify-center items-center bg-gray-100">
        <div className="form-wrapper w-full">
          <form
            className="max-w-sm mx-auto p-5 rounded-lg bg-white shadow-lg"
            onSubmit={handleLogin}
          >
            <h1 className="font-bold text-3xl mb-1">Login</h1>
            <span className="block mb-6">Silahkan masuk ke akun anda!</span>
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
            >
              Submit
            </button>
            <div className="text-register text-center">
              <span>
                Belum memiliki akun?{" "}
                <Link href="/auth/register" className="text-blue-500 underline">
                  register disini!
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
