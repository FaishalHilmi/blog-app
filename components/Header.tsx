"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="#"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Blog App
          </span>
        </Link>

        {/* Login/Logout Button */}
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {!session ? (
            <button
              onClick={() => signIn()}
              className="hidden md:block text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => signOut()}
              className="hidden md:block text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
            >
              Logout
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Menu */}
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          {session && (
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 dark:border-gray-700">
              {session?.user?.role === "ADMIN" ? (
                <>
                  <li>
                    <Link
                      href="/dashboard/admin"
                      className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-white"
                    >
                      Beranda
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/admin/user"
                      className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-white"
                    >
                      Pengguna
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/admin/articles"
                      className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-white"
                    >
                      Artikel
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href="/dashboard/writer"
                      className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-white"
                    >
                      Beranda
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/writer/articles"
                      className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-white"
                    >
                      Artikel
                    </Link>
                  </li>
                </>
              )}

              {/* Mobile Login/Logout Button */}
              <li>
                {!session ? (
                  <button
                    onClick={() => signIn()}
                    className="block md:hidden w-full text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
                  >
                    Login
                  </button>
                ) : (
                  <button
                    onClick={() => signOut()}
                    className="block md:hidden w-full text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
                  >
                    Logout
                  </button>
                )}
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
