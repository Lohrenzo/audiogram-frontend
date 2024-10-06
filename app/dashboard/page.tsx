"use client";

import { useSession } from "next-auth/react";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import LineChart from "../components/Charts/lineChart";
import DisplayAlbums from "../components/displayAlbums";
import DisplayUserAudios from "./components/displayUserAudios";

// zustand
import { useIsSidebarOpenStore } from "../store/store";

import Unauthorized from "../unauthorized";
import getArtistStreamAndRevenue from "../lib/getArtistStreamAndRevenue";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const { isSidebarOpen } = useIsSidebarOpenStore();
  const [streamCount, setStreamCount] = useState("0");
  const [artistRevenue, setArtistRevenue] = useState("0");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      (async () => {
        try {
          const fetchedStreamCount = await getArtistStreamAndRevenue(session.user.id);
          setStreamCount(fetchedStreamCount.artist_streams);
          setArtistRevenue(fetchedStreamCount.artist_revenue_share);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [status, session])

  if (session) {
    if (session?.user?.is_artist) {
      return (
        <main
          className={ `${session?.user ? "h-[80vh]" : "h-[100vh]"} md:overflow-y-hidden overflow-y-auto overflow-x-hidden p-2 grid md:grid-cols-2 grid-cols-1 gap-3 place-items-start` }
        >
          <div className="flex flex-col w-full h-full gap-2">
            <DisplayAlbums fetchType="user" />
            <div className="flex flex-col items-center justify-center gap-2 h-full w-full">
              <p className="font-bold text-xl capitalize">Total streams: { streamCount }</p>
              <p className="font-bold text-xl">Revenue: £ { artistRevenue }</p>
            </div>
          </div>
          <DisplayUserAudios />
          {/* </div> */ }
        </main>
      );
    } else return <Unauthorized />;
  };
}
