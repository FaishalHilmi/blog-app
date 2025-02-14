import Image from "next/image";
import Link from "next/link";

export default function DetailPage() {
  return (
    <section className="pt-20 bg-gray-100 min-h-screen">
      <div className="admin-container max-w-screen-2xl px-4 mx-auto py-10">
        <Link
          href="/dashboard/writer"
          className="inline-block mb-6 text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Kembali
        </Link>
        <Link
          href="/dashboard/writer/articles/edit"
          className="bg-blue-700 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium"
        >
          Edit Artikel
        </Link>
        <div className="artikel-wrapper bg-white shadow-sm p-6 rounded-lg">
          <Image
            src="https://soshace.com/wp-content/uploads/2019/10/Getting-Started-with-NextJS-Inside.jpg"
            alt="Gambar Artikel"
            className="w-full h-96 object-cover rounded-lg mb-6"
            width={500} // Lebar gambar
            height={300} // Tinggi gambar
          />
          <h1 className="capitalize text-3xl font-bold mb-1">
            Tutorial Next.ts Tahun 2024
          </h1>
          <span className="block mb-4 text-gray-400">11 Februari 2024</span>
          <p className="text-justify">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam id
            atque cum sint architecto non, optio reprehenderit ex repellendus
            voluptate distinctio quam sed fuga placeat adipisci incidunt rem,
            maiores perspiciatis qui rerum iure aut explicabo nemo saepe? Error
            possimus explicabo laborum veniam iure a illum alias exercitationem.
            Atque est voluptate facere numquam temporibus cum dolor tempora
            similique veritatis in. Nostrum incidunt minima vitae alias quas,
            enim cum. Quibusdam iure aliquid repudiandae sit, incidunt, sequi
            cum pariatur provident labore repellat, amet ipsum maiores obcaecati
            laboriosam officia! Magni nemo, odio eligendi delectus, deserunt
            consequuntur velit laborum consectetur, error perferendis odit amet
            temporibus.
          </p>
        </div>
      </div>
    </section>
  );
}
