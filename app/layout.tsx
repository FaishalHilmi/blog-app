"use client";
// import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import HeaderWrapper from "@/components/HeaderWrapper";
import { SessionProvider } from "next-auth/react";

const inter = Inter({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

// export const metadata: Metadata = {
//   title: "Blog App",
//   description: "Find the fresh idea and your inovation",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <HeaderWrapper />
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
