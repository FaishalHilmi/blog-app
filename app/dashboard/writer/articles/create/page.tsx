"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateArticle() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.size > 2 * 1024 * 1024) {
        setMessage("Ukuran gambar max 2MB");
        setImage(null);
        setPreview(null);
        e.target.value = "";
        setTimeout(() => setMessage(""), 5000);
        return;
      }

      setImage(file);
      setPreview(URL.createObjectURL(file));
      setMessage("");
    }
  };

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      form.append("title", title);
      form.append("content", description);
      if (image) {
        form.append("image", image);
      }

      const res = await fetch("/api/articles", {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
        setTimeout(() => setMessage(""), 5000);
      }

      setTitle("");
      setDescription("");
      setImage(null);
      setPreview(null);
    } catch (error) {
      setMessage("Terjadi kesalahan. Coba lagi nanti.");
    } finally {
      setLoading(false);
      router.push("/dashboard/writer/articles");
    }
  };

  return (
    <section className="pt-20 bg-gray-100 min-h-screen">
      <div className="admin-container max-w-screen-2xl px-4 mx-auto py-10">
        <Link
          href={"/dashboard/writer/articles"}
          className="inline-block mb-6 text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Kembali
        </Link>
        <h1 className="mb-10 text-4xl font-bold text-black">Tambah Artikel</h1>

        <div className="form-wrapper w-full bg-white p-6">
          <form onSubmit={handleCreateArticle}>
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
                  name="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Belajar Next.ts"
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
                  name="image"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleImageChange}
                />
                {preview && (
                  <div className="mt-4">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
                <p className="mt-2 text-sm text-red-500">{message}</p>
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
                name="content"
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Next.ts adalah..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {loading ? "Mengirim..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
