"use client";

import { useSession } from "next-auth/react";
import Unauthorized from "./unauthorized";
import { Suspense, useEffect, useRef, useState } from "react";
import Loading from "./loading";

import getAllAudios from "./lib/getAllAudios";
import ListItem from "./components/listItem";
import { redirect } from "next/navigation";
import Image from "next/image";

// images
import img1 from "../public/img/yellow2.png";
// import img2 from "../public/img/blue.png";
// import img3 from "../public/img/red2.png";
import { FaFaceGrinStars } from "react-icons/fa6";

// zustand
import { useIsSidebarOpenStore } from "./store/store";

import DisplayAlbums from "./components/displayAlbums";
import Skeleton from "./components/skeletons/skeleton";

export default function Audios() {
  const { data: session, status } = useSession();
  // const audioRef = useRef(new Audio()); // Create a ref for the audio player
  // const [volume, setVolume] = useState(audioRef.current.volume);

  const [songs, setSongs] = useState<Song[] | null>(null);
  const [albums, setAlbums] = useState<Album[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const { isSidebarOpen } = useIsSidebarOpenStore();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      (async () => {
        try {
          const fetchedSongs: Song[] = await getAllAudios(session.access);
          setSongs(fetchedSongs);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [status, session]);

  // if (status === "loading") return <Loading />;

  // if (!session) {
  //   redirect("/");
  // }

  if (session && !session?.user) {
    return <Unauthorized />;
  }

  return (
    <main
      className={ `flex flex-col items-center justify-start p-2 h-[85vh]` }
    >
      <div className="w-full text-center">
        <h1 className="w-full text-center mb-2 flex flex-row items-center justify-center gap-3">
          Welcome{ `, ${session?.user?.username || ""}` } <FaFaceGrinStars />
        </h1>
      </div>

      <div className="h-[240px] w-full">
        <DisplayAlbums fetchType="all" />
      </div>

      <div className="h-full w-full block pb-8 overflow-hidden">
        <h2 className="w-full my-2">{ loading ? <Skeleton width="20%" height="1rem" variant="" /> : "Featured Songs" }</h2>
        { loading ? (
          <ul className="grid grid-cols-1 gap-y-2 h-full w-full overflow-hidden p-2 border-t border-slate-800">
            <Skeleton width="100%" height="50px" variant="rounded-lg" />
            <Skeleton width="100%" height="50px" variant="rounded-lg" />
            <Skeleton width="100%" height="50px" variant="rounded-lg" />
            <Skeleton width="100%" height="50px" variant="rounded-lg" />
            <Skeleton width="100%" height="50px" variant="rounded-lg" />
            <Skeleton width="100%" height="50px" variant="rounded-lg" />
            <Skeleton width="100%" height="50px" variant="rounded-lg" />
            <Skeleton width="100%" height="50px" variant="rounded-lg" />
            <Skeleton width="100%" height="50px" variant="rounded-lg" />
            <Skeleton width="100%" height="50px" variant="rounded-lg" />
            <Skeleton width="100%" height="50px" variant="rounded-lg" />
          </ul>
        ) : error ? (
          <p className="text-red-500">Something went wrong: { error.message }</p>
        ) : songs && (
          <ul className="grid grid-cols-1 h-full w-full overflow-y-auto overflow-x-hidden p-2 border-t border-slate-800">
            { songs.map((song: Song) => (
              <ListItem
                key={ song.id }
                id={ song.id }
                title={ song.title }
                src={ song.cover }
                artist={ song.artist }
                type="Single"
                audioFile={ song.audio }
                time="00:00"
              />
            )) }
          </ul>
        ) }
      </div>
    </main>
  );
}
