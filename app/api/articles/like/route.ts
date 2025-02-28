import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async () => {
  const session = await getServerSession(authOptions);
  const authorId = Number(session?.user?.id);

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json(
      { error: true, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const totalLikes = await prisma.like.count({
      where: {
        post: {
          authorId: Number(authorId), // Filter berdasarkan authorId di model Post
        },
      },
    });

    return NextResponse.json(
      {
        error: false,
        message: "Berhasil mendapatkan like berdasarkan id",
        count: totalLikes,
      },
      { status: 500 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: true, message: "Gagal mendapatkan like berdasarkan id" },
      { status: 500 }
    );
  }
};
