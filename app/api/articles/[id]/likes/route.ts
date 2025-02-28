import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Sesuaikan dengan lokasi prisma instance
import { getServerSession } from "next-auth"; // Pakai NextAuth untuk autentikasi
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const userId = Number(session.user.id);
  const postId = parseInt(params.id);

  try {
    // Cek apakah user sudah like
    const existingLike = await prisma.like.findFirst({
      where: { userId, postId },
    });

    if (existingLike) {
      // Jika sudah like, maka unlike (hapus)
      await prisma.like.delete({ where: { id: existingLike.id } });
      return NextResponse.json({ message: "Unliked", isLiked: false });
    } else {
      // Jika belum like, maka tambah like
      await prisma.like.create({ data: { userId, postId } });
      return NextResponse.json({ message: "Liked", isLiked: true });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id) || null;
  const postId = parseInt(params.id);

  try {
    // Hitung jumlah like
    const totalLikes = await prisma.like.count({ where: { postId } });

    // Cek apakah user sudah like artikel ini
    const userLike = userId
      ? await prisma.like.findFirst({ where: { userId, postId } })
      : null;

    return NextResponse.json({ likes: totalLikes, isLiked: !!userLike });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
