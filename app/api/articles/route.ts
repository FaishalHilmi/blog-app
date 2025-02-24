import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

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
    // Menangkap data dari request
    const data = await req.formData();

    const title = data.get("title") as string;
    const content = data.get("content") as string;
    const imageFile = data.get("imageUrl") as File | null;
    const authorId = Number(data.get("authorId"));
    let imageUrl = null;

    // Validasi inputhttp://localhost:3000/api/articles/7
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
      data: newArticle,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: true,
      message: "Gagal menambahkan data",
    });
  }
};
