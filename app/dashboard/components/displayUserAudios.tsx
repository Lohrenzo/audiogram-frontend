"use client";

import getUserAudios from "@/app/lib/getUserAudios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SlOptions } from "react-icons/sl";
import humanizeDate from "@/app/lib/humanizeDate";
import Skeleton from "@/app/components/skeletons/skeleton";
import Audio from "./audio";

export default function DisplayUserAudios() {
  const { data: session, status } = useSession();

  const [audios, setAudios] = useState<Song[] | null>([]);
  const [loading, setLoading] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [error, setError] = useState<any>(null);

  // Ref for the options div to track clicks outside of it
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      (async () => {
        try {
          const fetchedAlbums = await getUserAudios(session.access);
          if (Array.isArray(fetchedAlbums)) {
            setAudios(fetchedAlbums);
            setLoading(false);
          } else {
            console.error("Fetched albums is not an array:", fetchedAlbums);
            setError("Invalid data format received");
          }
        } catch (error) {
          setError(error);
        }
      })();
    }
  }, [status, session]);

  // Effect to handle clicks outside the options div
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If the click is outside the options div, hide the options
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };

    // Add the event listener for the entire document
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className={ `${session?.user ? "h-[80vh]" : "h-[100vh]"} grid grid-cols-1 overflow-y-hidden w-full min-h-full pe-1` }>
      <div className="p-2 border border-slate-800 shadow-[#45437086] bg-black/40 backdrop-blur-lg rounded-lg h-[85vh] w-full">
        <h1>Your Songs</h1>
        <p className="mb-2 bg-slate-600 rounded-md p-px"></p>
        <div className="flex items-start justify-center overflow-x-hidden overflow-y-auto py-2 gap-x-4 h-full w-full">
          { loading ? (
            <div className="*:border-b *:border-[#45437086] *:pb-1 overflow-x-hidden overflow-y-auto flex flex-col gap-y-2 place-items-start p-1 w-full h-full">
              <Skeleton width="100%" height="50px" variant="w-full rounded-md" />
              <Skeleton width="100%" height="50px" variant="w-full rounded-md" />
              <Skeleton width="100%" height="50px" variant="w-full rounded-md" />
              <Skeleton width="100%" height="50px" variant="w-full rounded-md" />
              <Skeleton width="100%" height="50px" variant="w-full rounded-md" />
              <Skeleton width="100%" height="50px" variant="w-full rounded-md" />
              <Skeleton width="100%" height="50px" variant="w-full rounded-md" />
              <Skeleton width="100%" height="50px" variant="w-full rounded-md" />
              <Skeleton width="100%" height="50px" variant="w-full rounded-md" />
              <Skeleton width="100%" height="50px" variant="w-full rounded-md" />
            </div>
          ) : error ? (
            <p className="min-w-full h-[190px] text-red-500">{ error }</p>
          ) : (
            <>
              { audios && audios.length > 0 ? (
                <ul className="*:border-b *:border-[#45437086] *:pb-1 overflow-x-hidden overflow-y-auto grid grid-cols-1 gap-y-2 place-items-start p-1 w-full h-fit max-h-[87vh]">
                  { audios.map((audio: Song) => (
                    <Audio
                      key={ audio.id }
                      audio={ audio } />
                  )) }
                </ul>
              ) : (
                <p className="min-w-full h-[100%]">No Song Found !</p>
              ) }
            </>
          ) }
        </div>
      </div>
    </section>
  );
}
