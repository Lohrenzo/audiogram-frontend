"use client";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import playIcon from "../../public/img/icons/play.png";

import SongsQueue from "./songsQueue";

export default function rightSide() {
  const { data: session } = useSession();
  const pathname = usePathname();
  // const items = Array.from({ length: 15 });

  if (session) {
    if (pathname === "/" || pathname === "/login" || pathname === "/register") {
      return null;
    } else {
      return (
        <section className="fixed right-0 top-0 w-[20vw] h-screen p-2">
          <div className="p-2">
            <h3 className="capitalize mb-0">genres</h3>
            <div className="flex h-[30vh] items-center justify-start flex-wrap gap-1">
              <p className="border border-slate-800 rounded-lg p-2 bg-black/40 backdrop-blur-md">
                Afrobeats
              </p>
              <p className="border border-slate-800 rounded-lg p-2 bg-black/40 backdrop-blur-md">
                Amapiano
              </p>
              <p className="border border-slate-800 rounded-lg p-2 bg-black/40 backdrop-blur-md">
                Jazz
              </p>
              <p className="border border-slate-800 rounded-lg p-2 bg-black/40 backdrop-blur-md">
                Hip Hop
              </p>
              <p className="border border-slate-800 rounded-lg p-2 bg-black/40 backdrop-blur-md">
                Pop
              </p>
              <p className="border border-slate-800 rounded-lg p-2 bg-black/40 backdrop-blur-md">
                Dancehall
              </p>
              <p className="border border-slate-800 rounded-lg p-2 bg-black/40 backdrop-blur-md">
                Drill
              </p>
            </div>
          </div>

          <SongsQueue />
        </section>
      );
    }
  }
}
