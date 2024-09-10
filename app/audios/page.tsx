"use client";

import { useSession } from "next-auth/react";
import Unauthorized from "../unauthorized";
import { Suspense, useEffect, useRef, useState } from "react";
import Loading from "../loading";

import getAllSongs from "../lib/getAllSongs";
import ListItem from "../components/listItem";
import { redirect } from "next/navigation";
import Image from "next/image";

// images
import img1 from "../../public/img/yellow2.png";
import img2 from "../../public/img/blue.png";
import img3 from "../../public/img/red2.png";

// zustand
import { useIsSidebarOpenStore } from "../store/store";
import DisplayAlbums from "../components/displayAlbums";

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
          const fetchedSongs: Song[] = await getAllSongs(session.access);
          setSongs(fetchedSongs);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [status, session]);

  if (status === "loading") return <Loading />;

  if (!session) {
    redirect("/");
  }

  if (session && !session?.user) {
    return <Unauthorized />;
  }

  return (
    <main
      className={ `${isSidebarOpen ? "w-[60vw]" : "w-[71vw]"
        } transition-all ease-in-out duration-200 flex h-screen flex-col items-center justify-start p-2` }
    >
      <div className="w-full text-center">
        <h1 className="w-full text-center mb-2">
          Welcome, { session.user?.username }!
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-x-3 w-full items-center">
        <div className="flex flex-row-reverse justify-center items-center h-full rounded-xl shadow-inner shadow-slate-700 bg-white/5 backdrop-blur">
          <h3 className="absolute bottom-1/2 right-2 text-center text-[teal] text-sm">Good Vibes</h3>
          <Image
            alt="Good Vibes"
            src={ img1 }
            className="object-cover object-top w-[200px] h-[190px]"
            width={ 200 }
            height={ 170 }
            loading="lazy"
          />
        </div>
        <div className="col-span-2">
          <DisplayAlbums fetchType="all" />
        </div>
      </div>
      <h2 className="w-full my-2">Featured Songs</h2>
      <Suspense fallback={ <Loading /> }>
        { error && (
          <p className="text-red-500">Something went wrong: { error.message }</p>
        ) }
        {/* Put the loaded data here */ }
        { songs && (
          <ul className="grid grid-cols-1 w-full p-2 border-t border-slate-800">
            { songs.map((song: Song) => (
              <ListItem
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
      </Suspense>
    </main>
  );
}
