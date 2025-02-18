import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        likes: true,
      },
    });

    return NextResponse.json({
      error: false,
      message: "Berhasil mendapatkan data",
      payload: posts,
    });
  } catch (error) {
    return NextResponse.json({
      error: true,
      message: "Gagal mendapatkan data",
    });
  }
};

export const POST = async (req: Request) => {
  try {
    // Menangkap data dari request
    const data = await req.formData();

    const title = data.get("title") as string;
    const content = data.get("content") as string;
    const imageUrl = data.get("imageUrl") as string | null;
    const authorId = Number(data.get("authorId"));

    // Validasi input
    if (!title || !content || !authorId) {
      return NextResponse.json({
        error: true,
        message: "Diperlukan nilai Title, content dan authorId",
      });
    }

    const newArticle = await prisma.post.create({
      data: {
        title,
        content,
        imageUrl,
        authorId,
      },
    });

    return NextResponse.json({
      error: false,
      message: "Berhasil menambahkan data",
      data: newArticle,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: true,
      message: "Gagal menambahkan data",
    });
  }
};
