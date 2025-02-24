import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className={`${inter.className}`}>{children}</main>; // Tanpa Header
}
