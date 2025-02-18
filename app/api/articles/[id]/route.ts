import prisma from "@/lib/prisma";
import { Param } from "@prisma/client/runtime/library";
import { error } from "console";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const article = await prisma.post.findUnique({
      where: {
        id: Number(params.id),
      },
    });

    return NextResponse.json({
      error: false,
      message: "Berhasil",
      payload: article,
    });
  } catch (error) {
    return NextResponse.json({
      error: true,
      message: "gagal",
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

    if (isNaN(id)) {
      return NextResponse.json({
        error: true,
        message: "ID tidak ditemukan",
      });
    }

    const title = data.get("title") as string;
    const content = data.get("content") as string;
    const imageUrl = data.get("imageUrl") as string | null;
    const authorId = Number(data.get("authorId"));

    const updateArticle = await prisma.post.update({
      where: {
        id: Number(params.id),
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

export const DELETE = async (_, { params }: { params: { id: string } }) => {
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
