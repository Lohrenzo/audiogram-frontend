import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Audio Details",
  description: "Details about the song.",
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
