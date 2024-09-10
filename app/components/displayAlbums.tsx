"use client";

import Card from "@/app/components/card";
import getUserAlbums from "@/app/lib/getUserAlbums";
import getAllAlbums from "@/app/lib/getAllAlbums";
import { useSession } from "next-auth/react";
import { Suspense, useEffect, useState } from "react";

type Props = {
  fetchType: "user" | "all"; // Determines whether to fetch user albums or all albums
};

export default function DisplayAlbums({ fetchType }: Props) {
  const { data: session, status } = useSession();

  const [albums, setAlbums] = useState<Album[] | null>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      if (fetchType === "all") {
        (async () => {
          try {
            const fetchedAlbums = await getAllAlbums(session.access);
            if (Array.isArray(fetchedAlbums)) {
              setAlbums(fetchedAlbums);
            } else {
              console.error("Fetched albums is not an array:", fetchedAlbums);
              setError("Invalid data format received");
            }
          } catch (error) {
            setError(error);
          } finally {
            setLoading(false);
          }
        })();
      } else if (fetchType === "user") {
        (async () => {
          try {
            const fetchedAlbums = await getUserAlbums(session.access);
            if (Array.isArray(fetchedAlbums)) {
              setAlbums(fetchedAlbums);
            } else {
              console.error("Fetched albums is not an array:", fetchedAlbums);
              setError("Invalid data format received");
            }
          } catch (error) {
            setError(error);
          } finally {
            setLoading(false);
          }
        })();
      }
    }
  }, [fetchType, status, session]);

  const heading = fetchType === "user" ? "Your Albums" : "Featured Albums";

  return (
    <div className="p-2 border border-slate-800 shadow-[#33305daa] bg-black/40 backdrop-blur-lg rounded-lg h-full w-full">
      <h1>{ heading }</h1>
      <p className="mb-2 bg-slate-600 rounded-md p-px"></p>
      <ul className="display-cards flex flex-row overflow-x-auto overflow-y-hidden py-2 gap-x-4 w-full">
        { loading ? (
          <p className="min-w-full h-[142.5px]">Loading...</p>
        ) : error ? (
          <p className="min-w-full h-[142.5px] text-red-500">{ error }</p>
        ) : (
          <>
            { albums && albums.length > 0 ? (
              <>
                { albums.map((album: Album) => (
                  <Card
                    key={ album.id }
                    id={ album.id }
                    title={ album.title }
                    src={ album.cover }
                    artist={ album.artist }
                    type="album"
                    date={ album.released }
                  />
                )) }
              </>
            ) : (
              <p className="min-w-full h-[142.5px]">No Albums Found !</p>
            ) }
          </>
        ) }
      </ul>
    </div>
  );
}
