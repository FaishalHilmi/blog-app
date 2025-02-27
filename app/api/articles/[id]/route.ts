import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const article = await prisma.post.findUnique({
      where: {
        id: Number(params.id),
      },
      include: {
        likes: true,
      },
    });

    return NextResponse.json({
      error: false,
      message: "Berhasil mendapatkan artikel berdasarkan ID",
      payload: article,
    });
  } catch (error) {
    return NextResponse.json({
      error: true,
      message: "Gagal mendapatkan artikel berdasarkan ID",
    });
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const data = await req.formData();
    const id = Number(params.id);
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { error: true, message: "Unauthorized" },
        { status: 401 }
      );
    }

    if (isNaN(id)) {
      return NextResponse.json({
        error: true,
        message: "ID tidak ditemukan",
      });
    }

    const title = data.get("title") as string;
    const content = data.get("content") as string;
    const imageFile = data.get("image") as File | null;
    const authorId = Number(session?.user?.id);

    const existingArticle = await prisma.post.findUnique({
      where: { id },
    });

    if (!existingArticle) {
      return NextResponse.json({
        error: true,
        message: "Artikel tidak ditemukan.",
        data,
      });
    }

    let imageUrl = existingArticle.imageUrl;

    if (imageFile && imageFile.size > 0) {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");

      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      if (imageUrl) {
        const oldFilePath = path.join(
          process.cwd(),
          "public",
          "uploads",
          imageUrl
        );
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }

      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const fileName = `${Date.now()}-${imageFile.name}`;
      const filePath = path.join(uploadsDir, fileName);

      fs.writeFileSync(filePath, buffer);

      imageUrl = `/uploads/${fileName}`;
    }

    const updateArticle = await prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        imageUrl,
        authorId,
      },
    });

    return NextResponse.json({
      error: false,
      message: "Berhasil mengedit data",
      updateArticle,
    });
  } catch (error) {
    return NextResponse.json({
      error: true,
      message: "Gagal mengedit data",
    });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const idUser = Number(params.id);

  try {
    if (isNaN(idUser)) {
      return NextResponse.json({
        error: true,
        message: "ID tidak ditemukan",
      });
    }

    await prisma.post.delete({
      where: {
        id: Number(params.id),
      },
    });

    return NextResponse.json({
      error: false,
      message: "Berhasil menghapus data",
    });
  } catch (error) {
    return NextResponse.json({
      error: true,
      message: "Gagal menghapus data",
    });
  }
};
