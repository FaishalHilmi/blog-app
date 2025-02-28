"use client";

import { Article } from "@/types/article";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function articlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();

  const handleGetArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/articles");
      const data = await res.json();
      setArticles(data.payload);
    } catch (error) {
      console.log("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetArticles();
  }, []);

  useEffect(() => {
    console.log(articles);
  }, []);

  const handleDeleteArticle = async (id: number) => {
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      setMessage(data.message);
      setTimeout(() => setMessage(""), 3000);

      setArticles(articles.filter((article) => article.id !== id));
    } catch (error) {
      console.log("Gagal menghapus artikel");
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
        <h1 className="mb-10 text-4xl font-bold text-black">
          Analisis Artikel
        </h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  Judul
                </th>
                <th scope="col" className="px-6 py-3">
                  Penulis
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article, index) => (
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
                  <td className="px-6 py-4 capitalize">{article.title}</td>
                  <td className="px-6 py-4">{article.author.name}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeleteArticle(article.id)}
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
