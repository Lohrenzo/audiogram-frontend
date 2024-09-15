import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Audiogram",
    short_name: "Audiogram",
    description: "The music is within you.",
    start_url: "/audio",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/img/audiogram-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/img/audiogram-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
