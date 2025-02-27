import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

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
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { error: true, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Menangkap data dari request
    const data = await req.formData();

    const title = data.get("title") as string;
    const content = data.get("content") as string;
    const imageFile = data.get("image") as File | null;
    const authorId = Number(session.user.id);
    let imageUrl = null;

    if (!title || !content || !authorId) {
      return NextResponse.json({
        error: true,
        message: "Diperlukan nilai Title, content dan authorId",
      });
    }

    if (imageFile && imageFile.size > 0) {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");

      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const fileName = `${Date.now()}-${imageFile.name}`;
      const filePath = path.join(uploadsDir, fileName);

      // Tulis file ke folder public/uploads
      fs.writeFileSync(filePath, buffer);

      // Set URL gambar yang disimpan
      imageUrl = `/uploads/${fileName}`;
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
    });
  } catch (error: any) {
    return NextResponse.json({
      error: true,
      message: "Gagal menambahkan data",
    });
  }
};
