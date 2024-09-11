import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Audiogram",
  description: "The music is within you.",
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
