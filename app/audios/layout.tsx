import type { Metadata } from "next";
import Sidebar from "../components/sidebar";

export const metadata: Metadata = {
  title: "Audiogram",
  description: "The music is within you.",
};

export default function Layout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: any;
}>) {
  return (
    <main
    // className={`flex flex-row max-h-screen overflow-hidden`}
    >
      {/* <Sidebar /> */}
      {children}
    </main>
  );
}
