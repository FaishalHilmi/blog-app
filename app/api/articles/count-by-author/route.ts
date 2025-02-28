import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { error: true, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const authorId = Number(session.user.id);

    const totalArticlesByAuthor = await prisma.post.count({
      where: { authorId },
    });

    return NextResponse.json(
      {
        error: false,
        message: "Berhasil mendapatkan data artikel berdasarkan id",
        count: totalArticlesByAuthor,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: true,
        message: "Gagal mendapatkan data artikel berdasarkan id",
      },
      {
        status: 500,
      }
    );
  }
};
