import React from "react";

export default function WriterPages() {
  return (
    <section className="pt-20 bg-gray-100 min-h-screen">
      <div className="admin-container max-w-screen-2xl px-4 mx-auto py-10">
        <h1 className="mb-10 text-4xl font-bold">Analisis Dashboard</h1>
        <div className="count-section grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="count-artikel rounded-md py-2.5 px-4 bg-white shadow-sm">
            <h1 className="text-3xl font-bold mb-2">Jumlah Artikel</h1>
            <span className="text-xl">100 Artikel</span>
          </div>
          <div className="count-artikel rounded-md py-2.5 px-4 bg-white shadow-sm">
            <h1 className="text-3xl font-bold mb-2">Jumlah Total Likes</h1>
            <span className="text-xl">100 Likes</span>
          </div>
        </div>
      </div>
    </section>
  );
}
