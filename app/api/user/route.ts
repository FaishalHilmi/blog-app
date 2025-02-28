import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const allArticles = await prisma.user.findMany();

    return NextResponse.json(
      {
        error: false,
        message: "Berhasil mendapatkan data",
        payload: allArticles,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: true,
        message: "Gagal mendapatkan data",
      },
      { status: 500 }
    );
  }
};
