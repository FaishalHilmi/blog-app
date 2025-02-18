import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seedPosts = async () => {
  try {
    const posts = await prisma.post.createMany({
      data: [
        {
          title: "Post One",
          content: "This is the content of the first post.",
          imageUrl: "https://via.placeholder.com/150", // Contoh URL gambar
          authorId: 1, // Pastikan user dengan ID 1 sudah ada
        },
        {
          title: "Post Two",
          content: "This is the content of the second post.",
          imageUrl: "https://via.placeholder.com/150",
          authorId: 2, // Pastikan user dengan ID 2 sudah ada
        },
        {
          title: "Post Three",
          content: "This is the content of the third post.",
          imageUrl: "https://via.placeholder.com/150",
          authorId: 1, // Pastikan user dengan ID 1 sudah ada
        },
      ],
    });

    console.log(`Seeded ${posts.count} posts succesfully!`);
  } catch (error) {
    console.error("Error seeding posts", error);
  } finally {
    await prisma.$disconnect();
  }
};
