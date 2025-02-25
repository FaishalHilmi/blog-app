// import prisma from "@/lib/prisma";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.formData();

    const name = body.get("name") as string;
    const email = body.get("email") as string;
    const password = body.get("password") as string;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: true, message: "Semua field harus diisi" },
        { status: 400 }
      );
    }

    // Cek apakah email sudah digunakan
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error: true,
          message: "Email sudah terdaftar",
        },
        { status: 400 }
      );
    }

    // Hash password sebelum disimpan ke database
    const hashedPassword: string = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      error: false,
      message: "Register Berhasil",
      // newUser,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: true,
        message: "Register Gagal",
      },
      { status: 500 }
    );
  }
};
