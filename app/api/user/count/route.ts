import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const totalUser = await prisma.user.count();

    return NextResponse.json(
      {
        error: false,
        message: "Berhasil mengambil jumlah data user",
        count: totalUser,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: true,
        message: "Gagal mengambil jumlah data user",
      },
      {
        status: 500,
      }
    );
  }
};
