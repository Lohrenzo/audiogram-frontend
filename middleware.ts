export { default } from "next-auth/middleware";

export const config = {
  // specify the route you want to protect
  matcher: [
    "/dashboard/:path*",
    "/audios/:path*",
    "/upload/:path*",
    "/settings/:path*",
  ],
};
