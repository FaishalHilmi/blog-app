"use client";

import { Article } from "@/types/article";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailPage() {
  const [article, setArticle] = useState<Article | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();

  const fetchArticle = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/articles/${id}`);
      const data = await res.json();
      setArticle(data.payload);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      fetchArticle;
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [id]);

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
          href={`/dashboard/writer/articles/edit/${id}`}
          className="bg-blue-700 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium"
        >
          Edit Artikel
        </Link>
        {loading ? (
          <div className="text-center py-10">
            <p className="text-lg font-semibold text-gray-600">
              Memuat data...
            </p>
          </div>
        ) : (
          <div className="artikel-wrapper bg-white shadow-sm p-6 rounded-lg">
            {article?.imageUrl ? (
              <Image
                src={article.imageUrl} // Tidak perlu menambahkan "/uploads/" lagi
                alt="Gambar Artikel"
                className="w-full h-96 object-cover rounded-lg mb-6"
                width={500}
                height={300}
              />
            ) : (
              <p className="text-gray-400">Gambar tidak tersedia</p>
            )}
            <h1 className="capitalize text-3xl font-bold mb-2 text-black">
              {article?.title}
            </h1>
            <span className="block mb-4 text-gray-400">
              {moment(article?.createdAt).locale("id").format("LL")}
            </span>
            <p className="text-justify text-black">{article?.content}</p>
          </div>
        )}
      </div>
    </section>
  );
}
