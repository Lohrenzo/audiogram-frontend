import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Audiogram Dashboard Page",
  manifest: "/web.manifest",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      { children }
    </main>
  );
}
