import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const postId = Number(params.id);
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (isNaN(postId)) {
      return NextResponse.json({
        error: false,
        message: "Artikel tidak ditemukan",
      });
    }

    const likesCount = await prisma.like.count({ where: { postId } });

    let userLiked = false;

    if (userId) {
      const numericUserId = Number(userId);

      // **Validasi apakah userId ada di database**
      const userExists = await prisma.user.findUnique({
        where: { id: numericUserId },
      });

      if (!userExists) {
        return NextResponse.json(
          { error: true, message: "User tidak ditemukan" },
          { status: 404 }
        );
      }

      // **Cek apakah user sudah like post**
      const existingLike = await prisma.like.findFirst({
        where: {
          postId,
          userId: numericUserId,
        },
      });

      userLiked = existingLike !== null;
    }

    return NextResponse.json({
      error: false,
      message: "Berhasil mendapatkan jumlah likes",
      payload: { postId, likes: likesCount, userLiked },
    });
  } catch (error) {
    return NextResponse.json({
      error: true,
      message: "Gagal mendapatkan jumlah likes",
    });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const postId = Number(params.id);
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (isNaN(postId) || !userId) {
      return NextResponse.json(
        {
          error: true,
          message: "Data tidak Valid",
        },
        { status: 400 }
      );
    }

    const numericUserId = Number(userId);

    // **Validasi apakah userId ada di database**
    const userExists = await prisma.user.findUnique({
      where: { id: numericUserId },
    });

    if (!userExists) {
      return NextResponse.json(
        {
          error: true,
          message: "User tidak ditemukan",
        },
        { status: 404 }
      );
    }

    // **Validasi apakah postId ada di database**
    const postExists = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!postExists) {
      return NextResponse.json(
        { error: true, message: "Post tidak ditemukan" },
        { status: 404 }
      );
    }

    // **Cek apakah user sudah like post ini**
    const existingLike = await prisma.like.findFirst({
      where: {
        postId,
        userId: numericUserId,
      },
    });

    if (existingLike) {
      return NextResponse.json(
        { error: true, message: "User sudah memberikan like" },
        { status: 400 }
      );
    }

    await prisma.like.create({
      data: {
        postId,
        userId: numericUserId,
      },
    });

    return NextResponse.json({
      error: false,
      message: "Like berhasil",
    });
  } catch (error) {
    return NextResponse.json({
      error: true,
      message: "Gagal melakukan like",
    });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const postId = Number(params.id);
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (isNaN(postId) || !userId) {
      return NextResponse.json(
        {
          error: true,
          message: "Data tidak Valid",
        },
        { status: 400 }
      );
    }

    const numericUserId = Number(userId);

    // **Validasi apakah userId ada di database**
    const userExists = await prisma.user.findUnique({
      where: { id: numericUserId },
    });

    if (!userExists) {
      return NextResponse.json(
        {
          error: true,
          message: "User tidak ditemukan",
        },
        { status: 404 }
      );
    }

    // **Validasi apakah postId ada di database**
    const postExists = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!postExists) {
      return NextResponse.json(
        { error: true, message: "Post tidak ditemukan" },
        { status: 404 }
      );
    }

    // **Cek apakah user sudah like post ini**
    const existingLike = await prisma.like.findFirst({
      where: {
        postId,
        userId: numericUserId,
      },
    });

    if (!existingLike) {
      return NextResponse.json(
        { error: true, message: "User belum memberikan like" },
        { status: 400 }
      );
    }

    await prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    });

    return NextResponse.json({
      error: false,
      message: "Berhasil menghapus like",
    });
  } catch (error) {
    return NextResponse.json({
      error: true,
      message: "Gagal menghapus like",
    });
  }
};
