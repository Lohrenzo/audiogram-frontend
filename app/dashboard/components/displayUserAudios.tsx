"use client";

// import getUserAlbums from "@/app/lib/getUserAlbums";
import getUserAudios from "@/app/lib/getUserAudios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { SlOptions } from "react-icons/sl";
import humanizeDate from "@/app/lib/humanizeDate";

export default function DisplayUserAudios() {
  const { data: session, status } = useSession();

  const [audios, setAudios] = useState<Song[] | null>([]);
  const [loading, setLoading] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [error, setError] = useState<any>(null);

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

  return (
    <section className="grid grid-cols-1 overflow-y-hidden w-full min-h-full pe-1">
      <div className="p-2 border border-slate-800 shadow-[#45437086] bg-black/40 backdrop-blur-lg rounded-lg w-full">
        <h1>Your Songs</h1>
        <p className="mb-2 bg-slate-600 rounded-md p-px"></p>
        <ul className="flex items-start justify-center overflow-x-hidden overflow-y-auto py-2 gap-x-4 h-full w-full">
          { loading ? (
            <p className="min-w-full h-[100%]">Loading...</p>
          ) : error ? (
            <p className="min-w-full h-[190px] text-red-500">{ error }</p>
          ) : (
            <>
              { audios && audios.length > 0 ? (
                <div className="grid grid-cols-1 w-full">
                  <div className="grid grid-cols-4 items-center place-items-start w-full gap-1 text-sm">
                    <p className="text-left col-span-2 w-full">Title</p>
                    <p>Release Date</p>
                    <p></p>
                  </div>
                  <div className="*:border-b *:border-[#45437086] *:pb-1 overflow-x-hidden overflow-y-auto grid grid-cols-1 gap-y-2 place-items-start p-1 w-full h-fit max-h-[87vh]">
                    { audios.map((audio: Song) => (
                      <div
                        key={ audio.id }
                        className="grid grid-cols-4 items-center place-items-start w-full gap-1 hover:scale-[0.98] duration-200 transition-all"
                      >
                        <div className="col-span-2 flex gap-x-3 flex-nowrap flex-row items-center justify-start w-full">
                          <Image
                            src={ audio.cover || "https://placehold.co/400" }
                            className=" object-cover object-center rounded-md size-[50px]"
                            alt={ `${audio.title} cover` }
                            width={ 50 }
                            height={ 50 }
                          />
                          <p className="text-sm">{ audio.title }</p>
                        </div>
                        <p className="text-xs">
                          { humanizeDate(audio.released) }
                        </p>
                        <div className="flex w-full items-center justify-center gap-x-3 text-sm">
                          <SlOptions />
                          {/* <Link
                        href=""
                        className="hover:opacity-45 hover:scale-125 ease-in-out transition-all duration-150"
                      >
                        edit
                      </Link>
                      <Link
                        href=""
                        className="hover:opacity-45 hover:scale-125 ease-in-out transition-all duration-150"
                      >
                        delete
                      </Link> */}
                        </div>
                      </div>
                    )) }
                  </div>
                </div>
              ) : (
                <p className="min-w-full h-[100%]">No Song Found !</p>
              ) }
            </>
          ) }
        </ul>
      </div>
    </section>
  );
}
