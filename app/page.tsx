import Card from "@/components/Card";
import Image from "next/image";

export default function Home() {
  return (
    <section className="pt-20 bg-gray-100 min-h-screen">
      <div className="admin-container max-w-screen-2xl px-4 mx-auto py-10">
        <div className="heading text-center mb-20">
          <h1 className="mb-4 text-5xl font-bold">
            Jelajahi Dunia Kreativitas dan Inovasi
          </h1>
          <span className="text-lg">
            Temukan Ide-Ide Segar dan Tips Praktis untuk Mewujudkan Karya Anda
          </span>
        </div>
        <div className="card-section grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </section>
  );
}
