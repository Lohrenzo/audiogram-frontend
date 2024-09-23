"use client";

import Card from "@/app/components/card";
import getUserAlbums from "@/app/lib/getUserAlbums";
import getAllAlbums from "@/app/lib/getAllAlbums";
import { useSession } from "next-auth/react";
import { Suspense, useEffect, useState } from "react";
import Skeleton from "./skeletons/skeleton";

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
          }
          finally {
            setLoading(false);
          }
        })();
      }
    }
  }, [fetchType, status, session]);

  const heading = fetchType === "user" ? "Your Albums" : "Featured Albums";

  return (
    <div className="p-2 border border-slate-800 shadow-[#33305daa] bg-black/40 backdrop-blur-lg rounded-lg h-[35vh] w-full">
      { loading ? <Skeleton width="20%" height="1rem" variant="" />
        : <h1>{ heading }</h1>
      }
      <p className="mb-2 bg-slate-600 rounded-md p-px"></p>
      { loading ? (
        <ul className="display-cards flex flex-row items-start justify-start overflow-x-auto overflow-y-hidden py-2 gap-x-4 w-full">
          <Skeleton width="150px" height="143px" variant="rounded-md" />
          <Skeleton width="150px" height="143px" variant="rounded-md" />
          <Skeleton width="150px" height="143px" variant="rounded-md" />
          <Skeleton width="150px" height="143px" variant="rounded-md" />
          <Skeleton width="150px" height="143px" variant="rounded-md" />
          <Skeleton width="150px" height="143px" variant="rounded-md" />
          <Skeleton width="150px" height="143px" variant="rounded-md" />
        </ul>
      ) : error ? (
        <ul className="display-cards flex flex-row items-start justify-start overflow-x-auto overflow-y-hidden py-2 gap-x-4 w-full">
          <p className="min-w-full h-[142.5px] text-red-500">{ error }</p>
        </ul>
      ) : (
        <ul className="display-cards flex flex-row items-start justify-start overflow-x-auto overflow-y-hidden py-2 gap-x-4 w-full">
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
            <p className="min-w-full h-full">No Albums Found !</p>
          ) }
        </ul>
      ) }
    </div>
  );
}
