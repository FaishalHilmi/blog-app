import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const authorId = Number(params.id);

  try {
    if (isNaN(authorId)) {
      return NextResponse.json({
        error: true,
        message: "ID tidak ditemukan",
      });
    }

    await prisma.user.delete({
      where: {
        id: authorId,
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
