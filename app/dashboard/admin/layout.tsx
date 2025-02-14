import { ReactNode } from "react";
import { Inter } from "next/font/google";
import Header from "@/components/Header";

const inter = Inter({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for managing the platform",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <div className="flex">
          {/* Navbar */}
          <Header />
          {/* Main Content */}
          <main className="w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
