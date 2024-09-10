/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["audiogram-django-bucket.s3.eu-west-2.amazonaws.com", "audiogram-django-bucket.s3.amazonaws.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "audiogram-django-bucket.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
