import type { Metadata } from "next";
import { Inter, Cutive_Mono, Fahkwang } from "next/font/google";
import "./globals.css";
import Provider from "./context/provider";
import Sidebar from "./components/sidebar";
import RightSide from "./components/rightSide";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });
const cutiveMono = Fahkwang({ weight: "400", subsets: ["latin-ext"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: any;
}>) {
  const sessionData = await getServerSession();

  return (
    <html lang="en">
      <Provider session={session}>
        <body
          className={`${cutiveMono.className} relative flex flex-row max-h-screen overflow-hidden`}
        >
          {sessionData?.user && <Sidebar />}
          <main id="main-view" className="min-w-[60vw] max-w-[71vw]">{children}</main>
          {sessionData?.user && <RightSide />}
        </body>
      </Provider>
    </html>
  );
}
