import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const totalArticles = await prisma.post.count();

    return NextResponse.json({ count: totalArticles }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: true, message: "Gagal menghitung jumlah artikel" },
      { status: 500 }
    );
  }
};
