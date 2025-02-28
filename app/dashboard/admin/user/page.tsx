"use client";

import { Author } from "@/types/article";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function userPage() {
  const [usersData, setUsersData] = useState<Author[]>([]);

  const getAllUsers = async () => {
    try {
      const res = await fetch("/api/user");
      const data = await res.json();

      setUsersData(data.payload);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleDeletUser = async (id: number) => {
    try {
      const res = await fetch(`/api/user/${id}`, {
        method: "DELETE",
      });

      setUsersData(usersData.filter((user) => user.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="pt-20 bg-gray-100 min-h-screen">
      <div className="admin-container max-w-screen-2xl px-4 mx-auto py-10">
        <Link
          href={"/dashboard/admin"}
          className="inline-block mb-6 text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
        >
          Kembali
        </Link>
        <h1 className="mb-10 text-4xl text-black font-bold">
          Analisis Pengguna
        </h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  Nama
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user, index) => (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-gray-50 border-b border-gray-200"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4 capitalize">{user.name}</td>
                  <td className="px-6 py-4 lowercase">{user.email}</td>
                  <td className="px-6 py-4 capitalize">{user.role}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeletUser(user.id)}
                      className="font-medium text-red-600 hover:underline"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
