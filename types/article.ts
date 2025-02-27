export type Author = {
  id: number;
  name: string;
  email: string;
  password: string; // Sebaiknya password tidak perlu dimasukkan jika tidak digunakan
  role: string;
};

export type Article = {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  authorId: number;
  author: Author;
  likes: any[]; // Bisa diganti `number[]` jika hanya menyimpan ID user yang menyukai artikel
};
