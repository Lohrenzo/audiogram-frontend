import type { Metadata } from "next";
import { Inter, Cutive_Mono, Fahkwang } from "next/font/google";
import "./globals.css";
import Provider from "./context/provider";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import Loading from "./loading";

import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"] });
const fahkwang = Fahkwang({
  subsets: ["latin-ext"],
  weight: "400",
});


export const metadata: Metadata = {
  title: "Audiogram",
  description: "The music is within you.",
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
          className={ `${fahkwang.className} relative flex flex-row max-h-screen overflow-hidden` }
        >
          <Suspense fallback={ <Loading /> }>
            { sessionData?.user && <Sidebar /> }
            <main id="main-view" className="w-full h-screen relative transition-all ease-in-out duration-200">
              <section className={ `${sessionData?.user ? "h-[85vh]" : "h-screen"} mb-1` }>
                { children }
              </section>
              { sessionData?.user && <Footer /> }
            </main>
            <Toaster expand position="top-right" theme="system" richColors />
          </Suspense>
        </body>
      </Provider>
    </html>
  );
}
