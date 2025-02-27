export const getArticleDetail = async (id: number) => {
  const res = await fetch(`/api/articles/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
};
