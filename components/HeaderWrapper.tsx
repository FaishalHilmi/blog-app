"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Header from "./Header";

const authUrl = ["/auth/login", "/auth/register"];

export default function HeaderWrapper() {
  const pathname = usePathname();
  const hideHeader = authUrl.includes(pathname); // Cek apakah di halaman auth

  return !hideHeader ? <Header /> : null;
}
