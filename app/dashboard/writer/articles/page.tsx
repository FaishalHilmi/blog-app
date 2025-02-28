"use client";

import { Article } from "@/types/article";
import Link from "next/link";
import { useEffect, useState } from "react";
import moment from "moment";

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();

  const handleGetArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/articles/writer", {
        method: "GET",
      });
      const data = await res.json();
      setArticles(data.payload.articles);
    } catch (error) {
      console.log("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetArticles();
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
          href="/dashboard/writer"
          className="inline-block mb-6 text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
        >
          Kembali
        </Link>
        <Link
          href="/dashboard/writer/articles/create"
          className="bg-blue-700 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium"
        >
          Tambah Artikel
        </Link>
        <h1 className="mb-10 text-4xl font-bold text-black">
          Analisis Artikel
        </h1>
        {message && <p className="mb-4 text-red-500">{message}</p>}
        {loading ? (
          <div className="text-center py-10">
            <p className="text-lg font-semibold text-gray-600">
              Memuat data...
            </p>
          </div>
        ) : (
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
                    Tanggal Dibuat
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
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-4 capitalize">{article.title}</td>
                    <td className="px-6 py-4">
                      {moment(article.createdAt).locale("id").format("LL")}
                    </td>
                    <td className="px-6 py-4 flex gap-4">
                      <Link
                        href={`/dashboard/writer/articles/${article.id}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Detail
                      </Link>
                      <button
                        onClick={() => {
                          handleDeleteArticle(article.id);
                        }}
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
        )}
      </div>
    </section>
  );
}
