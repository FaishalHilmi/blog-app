import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json(
      { error: true, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const userId = Number(session.user.id);
  const postId = Number(params.id);

  try {
    const existingLike = await prisma.like.findFirst({
      where: { userId, postId },
    });

    if (existingLike) {
      // Jika sudah like, lakukan unlike
      await prisma.like.delete({
        where: { id: existingLike.id },
      });

      return NextResponse.json({ liked: false });
    } else {
      // Jika belum, tambahkan like
      await prisma.like.create({
        data: { userId, postId },
      });

      return NextResponse.json({ liked: true });
    }
  } catch (error) {
    return NextResponse.json(
      { error: true, message: "Gagal melakukan liked" },
      { status: 500 }
    );
  }
};
