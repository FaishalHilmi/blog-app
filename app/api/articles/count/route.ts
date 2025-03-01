import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const totalArticles = await prisma.post.count();

    return NextResponse.json(
      {
        error: true,
        message: "Berhasil mengambil jumlah data artikel",
        count: totalArticles,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: true, message: "Gagal mengambil jumlah data artikel" },
      { status: 500 }
    );
  }
};
