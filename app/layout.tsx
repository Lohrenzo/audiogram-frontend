import type { Metadata } from "next";
import { Inter, Cutive_Mono, Fahkwang } from "next/font/google";
import "./globals.css";
import Provider from "./context/provider";
import Sidebar from "./components/sidebar";
import Player from "./components/player";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import Loading from "./loading";

import { Toaster } from 'sonner';
import { FaFaceGrinStars } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import Nav from "./components/nav";


const inter = Inter({ subsets: ["latin"] });
const fahkwang = Fahkwang({
  subsets: ["latin-ext"],
  weight: "400",
});


export const metadata: Metadata = {
  title: "Audiogram",
  description: "The music is within you.",
  manifest: "/web.manifest",
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
      <Provider session={ session }>
        <body
          className={ `${fahkwang.className} relative flex flex-row gap-x-0 max-h-screen overflow-hidden` }
        >
          <Suspense fallback={ <Loading /> }>
            <main id="main-view" className="w-full h-screen relative transition-all ease-in-out duration-200">
              { sessionData?.user && <Sidebar /> }
              <Nav />
              <section className={ `${sessionData?.user ? "h-[80vh]" : "h-screen"} mb-1` }>
                { children }
              </section>
              { sessionData?.user && <section className="absolute bottom-0 left-0 right-0 h-[15vh] w-full z-20"><Player /></section> }
            </main>
            <Toaster
              expand
              position="top-right"
              theme="system"
              // closeButton
              // richColors
              toastOptions={ {
                unstyled: true,
                classNames: {
                  toast: "p-2 border border-slate-800 bg-white/10 backdrop-blur-lg rounded-lg flex items-center justify-center",
                  error: 'bg-red-600 text-white-400',
                  success: 'text-[#48a9c5]',
                  warning: 'text-yellow-400',
                  info: 'bg-blue-400',
                },
              } }
            />
          </Suspense>
        </body>
      </Provider>
    </html>
  );
}
