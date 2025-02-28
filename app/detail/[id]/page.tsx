"use client";

import { Article } from "@/types/article";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"; // Import useSession

export default function DetailPage() {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const { data: session } = useSession(); // Cek user login atau tidak
  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  // Ambil data artikel
  const fetchArticle = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/articles/${id}`);
      const data = await res.json();
      setArticle(data.payload);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Ambil data likes
  const fetchLikes = async () => {
    try {
      const res = await fetch(`/api/articles/${id}/likes`);
      const data = await res.json();
      setLikes(data.likes);
      setIsLiked(data.isLiked);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchArticle();
    fetchLikes();
  }, [id]);

  // Fungsi Like / Unlike
  const handleLike = async () => {
    if (!session) return; // Pastikan user login

    try {
      const res = await fetch(`/api/articles/${id}/likes`, {
        method: "POST",
      });
      const data = await res.json();
      setLikes(data.likes);
      setIsLiked(data.isLiked);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="pt-20 bg-gray-100 min-h-screen">
      <div className="max-w-screen-2xl px-4 mx-auto py-10">
        <Link
          href="/"
          className="inline-block mb-6 text-white bg-black hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Kembali
        </Link>
        {loading ? (
          <div className="text-center py-10">
            <p className="text-lg font-semibold text-gray-600">
              Memuat data...
            </p>
          </div>
        ) : (
          <div className="bg-white shadow-sm p-6 rounded-lg">
            {article?.imageUrl ? (
              <Image
                src={article.imageUrl}
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
            <div className="flex items-center gap-4 w-full mb-4">
              <span className="text-gray-400">
                {moment(article?.createdAt).locale("id").format("LL")}
              </span>
              {/* Tampilkan tombol Like hanya jika user login */}
              {session && (
                <button onClick={handleLike} className="text-black">
                  {isLiked ? "❤️ Unlike" : "🤍 Like"}
                </button>
              )}
            </div>
            <p className="text-justify text-black">{article?.content}</p>
          </div>
        )}
      </div>
    </section>
  );
}
