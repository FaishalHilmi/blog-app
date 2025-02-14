import { ReactNode } from "react";
import { Inter } from "next/font/google";
import HeaderWriter from "@/components/HeaderWriter";

const inter = Inter({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Writer Dashboard",
  description: "Writer dashboard for managing the platform",
};

export default function WriterLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <div className="flex">
          {/* Navbar */}
          <HeaderWriter />
          {/* Main Content */}
          <main className="w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
