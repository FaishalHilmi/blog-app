export { middleware } from "./middlewares/authMiddleware";

export const config = {
  matcher: ["/dashboard/:path*", "/auth/login", "/auth/register"],
};
