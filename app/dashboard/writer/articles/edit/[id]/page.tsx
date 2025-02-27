"use client";

import { Article } from "@/types/article";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditArticle() {
  const [article, setArticle] = useState<Article | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const router = useRouter();

  // Fetch data artikel
  const fetchArticle = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/articles/${id}`);
      const data = await res.json();
      setArticle(data.payload);
      setTitle(data.payload.title);
      setContent(data.payload.content);
    } catch (error) {
      console.error("Error fetching article:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [id]);

  // Handle update artikel
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image) {
        formData.append("image", image);
      }

      const res = await fetch(`/api/articles/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        throw new Error("Failed to update article");
      }

      router.push("/dashboard/writer/articles");
    } catch (error) {
      console.error("Error updating article:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-20 bg-gray-100 min-h-screen">
      <div className="admin-container max-w-screen-2xl px-4 mx-auto py-10">
        <Link
          href={"/dashboard/writer/articles"}
          className="inline-block mb-6 text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
        >
          Kembali
        </Link>
        <h1 className="mb-10 text-4xl font-bold">Edit Artikel</h1>

        <div className="form-wrapper w-full bg-white p-6">
          <form onSubmit={handleUpdate}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-5">
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Judul Artikel
                </label>
                <input
                  type="text"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Belajar Next.js"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="input-file">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900"
                  htmlFor="image"
                >
                  Gambar Artikel
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 p-2 rounded-lg cursor-pointer bg-gray-50"
                  id="image"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) =>
                    setImage(e.target.files ? e.target.files[0] : null)
                  }
                />
                {article?.imageUrl && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Gambar saat ini:</p>
                    <img
                      src={article.imageUrl}
                      alt="Gambar Artikel"
                      className="w-32 h-32 object-cover mt-2 border rounded"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="mb-5">
              <label
                htmlFor="content"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Deskripsi Artikel
              </label>
              <textarea
                id="content"
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Next.js adalah..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              disabled={loading}
            >
              {loading ? "Memperbarui..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
