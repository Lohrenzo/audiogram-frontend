import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Audio Details",
  description: "Details about the song.",
  manifest: "/web.manifest",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
    >
      { children }
    </main>
  );
}
