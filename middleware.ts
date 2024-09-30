export { default } from "next-auth/middleware";

export const config = {
  // specify the route you want to protect
  matcher: [
    "/",
    "/album/:path*",
    "/audio/:path*",
    "/dashboard/:path*",
    "/profile/:path*",
    "/playlist/:path*",
    "/upload/:path*",
  ],
};
