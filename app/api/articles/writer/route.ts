import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { error } from "console";

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { error: true, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const articles = await prisma.post.findMany({
      where: {
        authorId: Number(session.user.id),
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({
      error: false,
      message:
        articles.length > 0
          ? "Berhasil mendapatkan data artikel penulis"
          : "Penulis belum memiliki artikel",
      payload: {
        articles,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: true,
        message: "Gagal mendapatkan data artikel penulis",
      },
      { status: 404 }
    );
  }
};
