"use client";

import { useSession } from "next-auth/react";
import { Suspense } from "react";
import Link from "next/link";
import LineChart from "../components/Charts/lineChart";
import DisplayAlbums from "../components/displayAlbums";
import DisplayUserAudios from "./components/displayUserAudios";

// zustand
import { useIsSidebarOpenStore } from "../store/store";
import { redirect } from "next/navigation";
import Unauthorized from "../unauthorized";

export default function Dashboard() {
  const { data: session } = useSession();
  const { isSidebarOpen } = useIsSidebarOpenStore();

  if (session) {
    if (session?.user?.is_artist) {
      return (
        <main
          className={ `${session?.user ? "h-[80vh]" : "h-[100vh]"} overflow-y-hidden overflow-x-hidden p-2 grid md:grid-cols-2 grid-cols-1 gap-3 place-items-start` }
        >
          <DisplayAlbums fetchType="user" />
          {/* <div className="flex flex-col gap-y-4 pb-2 overflow-y-hidden h-[85vh] w-full">
            <div className="place-self-center w-full h-[40vh] border border-slate-800 shadow-[#45437086] text-white bg-black/40 backdrop-blur-lg p-2 rounded-lg">
              <h3 className="mb-1 text-left">Yearly Analytics</h3>
              <LineChart />
            </div>
          </div> */}

          <DisplayUserAudios />
          {/* </div> */ }
        </main>
      );
    } else return <Unauthorized />;
  };
}
