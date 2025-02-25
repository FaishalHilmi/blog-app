import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const pathname = req.nextUrl.pathname;
  const role = token?.role; // Ambil role user

  // Jika user sudah login, jangan izinkan akses ke halaman login & register
  if (token && (pathname === "/auth/login" || pathname === "/auth/register")) {
    const dashboardPath =
      role === "ADMIN" ? "/dashboard/admin" : "/dashboard/writer";
    return NextResponse.redirect(new URL(dashboardPath, req.url));
  }

  // Jika belum login, arahkan ke halaman login jika mencoba akses dashboard
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Proteksi akses berdasarkan role
  if (pathname.startsWith("/dashboard/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard/writer", req.url));
  }

  if (pathname.startsWith("/dashboard/writer") && role !== "WRITER") {
    return NextResponse.redirect(new URL("/dashboard/admin", req.url));
  }

  return NextResponse.next();
}
