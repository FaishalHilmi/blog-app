import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Card({
  id,
  imageUrl,
  title,
  content,
}: {
  id: number;
  imageUrl: string;
  title: string;
  content: string;
}) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
      <a href="#">
        <Image
          className="rounded-t-lg w-full h-44 object-cover"
          src={imageUrl}
          alt="Card Image"
          width={500}
          height={300}
        />
      </a>
      <div className="p-5">
        <Link href={`/detail/${id}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 line-clamp-1">
            {title}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-2">
          {content}
        </p>
        <Link
          href={`/detail/${id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
