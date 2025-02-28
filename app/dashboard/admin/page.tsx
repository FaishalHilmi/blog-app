"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [articleCount, setArticleCount] = useState<number>();
  const [userCount, setUserCount] = useState<number>();

  const getArticleCount = async () => {
    try {
      const res = await fetch("/api/articles/count");
      const data = await res.json();

      setArticleCount(data.count);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserCount = async () => {
    try {
      const res = await fetch("/api/user/count");
      const data = await res.json();

      setUserCount(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArticleCount();
    getUserCount();
  }, []);

  return (
    <section className="pt-20 bg-gray-100 min-h-screen">
      <div className="admin-container max-w-screen-2xl px-4 mx-auto py-10">
        <h1 className="mb-10 text-4xl font-bold text-black">
          Analisis Dashboard
        </h1>
        <div className="count-section grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="count-user rounded-md py-2.5 px-4 bg-white shadow-sm">
            <h1 className="text-3xl text-black font-bold mb-2">Jumlah Akun</h1>
            <span className="text-xl text-gray-500">{userCount} Akun</span>
          </div>
          <div className="count-artikel rounded-md py-2.5 px-4 bg-white shadow-sm">
            <h1 className="text-3xl text-black font-bold mb-2">
              Jumlah Artikel
            </h1>
            <span className="text-xl text-gray-500">
              {articleCount} Artikel
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
