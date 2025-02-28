"use client";

import Card from "@/components/Card";
import { Article } from "@/types/article";
import { useEffect, useState } from "react";

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getAllArticles = async () => {
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
    getAllArticles();
  }, []);

  return (
    <section className="pt-20 bg-gray-100 min-h-screen">
      <div className="admin-container max-w-screen-2xl px-4 mx-auto py-10">
        <div className="heading text-center mb-20">
          <h1 className="mb-4 text-5xl font-bold text-black">
            Jelajahi Dunia Kreativitas dan Inovasi
          </h1>
          <span className="text-lg text-gray-800">
            Temukan Ide-Ide Segar dan Tips Praktis untuk Mewujudkan Karya Anda
          </span>
        </div>
        <div className="card-section grid grid-cols-1 md:grid-cols-4 gap-4">
          {articles.map((article, index) => (
            <div key={index}>
              <Card
                id={article.id}
                imageUrl={article.imageUrl}
                title={article.title}
                content={article.content}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
